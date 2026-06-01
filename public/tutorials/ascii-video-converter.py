#!/usr/bin/env python3
"""
ASCII Video Converter
Converts video to ASCII art video with retro terminal style.
"""

import subprocess
import tempfile
import numpy as np
from PIL import Image
import sys
import os

# Character sets
CHARSETS = {
    'standard': ' ░▒▓█',
    'dense': ' ▁▂▃▄▅▆▇█',
    'blocks': ' ░▒▓█▀▄▐▌',
    'ascii': ' .\'`^",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$',
    'binary': '01',
    'dots': ' ·•●',
}

# Color palettes
PALETTES = {
    'green': lambda lum: (0, int(lum * 255), 0),
    'amber': lambda lum: (int(lum * 255), int(lum * 200), 0),
    'blue': lambda lum: (0, int(lum * 150), int(lum * 255)),
    'white': lambda lum: (int(lum * 255), int(lum * 255), int(lum * 255)),
    'original': None,  # Use original colors
}

def get_char(value, charset='standard'):
    """Map brightness value (0-1) to ASCII character."""
    chars = CHARSETS.get(charset, CHARSETS['standard'])
    idx = min(int(value * (len(chars) - 1)), len(chars) - 1)
    return chars[idx]

def frame_to_ascii(frame, width=120, charset='standard', palette='green'):
    """Convert a video frame to ASCII art."""
    # Calculate height preserving aspect ratio
    h, w = frame.shape[:2]
    ratio = h / w
    height = int(width * ratio * 0.45)  # ASCII chars are ~2x taller than wide
    
    # Resize frame
    img = Image.fromarray(frame)
    img = img.resize((width, height), Image.LANCZOS)
    small = np.array(img)
    
    # Calculate luminance
    lum = (0.299 * small[:,:,0] + 0.587 * small[:,:,1] + 0.114 * small[:,:,2]) / 255.0
    
    # Create ASCII art
    ascii_art = []
    colors = []
    
    for y in range(height):
        line = ''
        line_colors = []
        for x in range(width):
            char = get_char(lum[y, x], charset)
            line += char
            
            # Get color
            if palette == 'original':
                color = tuple(small[y, x])
            else:
                color_func = PALETTES[palette]
                color = color_func(lum[y, x])
            line_colors.append(color)
        
        ascii_art.append(line)
        colors.append(line_colors)
    
    return ascii_art, colors, width, height

def render_ascii_frame(ascii_art, colors, cell_w=8, cell_h=12):
    """Render ASCII art to a numpy array (image)."""
    height = len(ascii_art)
    width = len(ascii_art[0]) if height > 0 else 0
    
    # Create output image
    out_w = width * cell_w
    out_h = height * cell_h
    out = np.zeros((out_h, out_w, 3), dtype=np.uint8)
    
    # Fill background
    out[:] = [12, 12, 11]  # Dark background
    
    # Render characters
    from PIL import ImageDraw, ImageFont
    
    img = Image.fromarray(out)
    draw = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Menlo.ttc", cell_h - 2)
    except:
        font = ImageFont.load_default()
    
    for y in range(height):
        for x in range(width):
            char = ascii_art[y][x]
            if char != ' ':
                color = colors[y][x]
                draw.text((x * cell_w, y * cell_h), char, fill=color, font=font)
    
    return np.array(img)

def convert_video(input_path, output_path, width=120, charset='standard', palette='green', fps=24):
    """Convert video to ASCII art video."""
    print(f"Converting {input_path} to ASCII art...")
    
    # Get video info
    cmd = ['ffprobe', '-v', 'error', '-select_streams', 'v:0',
           '-show_entries', 'stream=width,height,r_frame_rate',
           '-of', 'csv=p=0', input_path]
    result = subprocess.run(cmd, capture_output=True, text=True)
    info = result.stdout.strip().split(',')
    orig_w, orig_h = int(info[0]), int(info[1])
    
    # Calculate output dimensions
    ratio = orig_h / orig_w
    out_height = int(width * ratio * 0.45)
    cell_w = 8
    cell_h = 12
    out_w = width * cell_w
    out_h = out_height * cell_h
    
    print(f"Output: {out_w}x{out_h} ({width}x{out_height} chars)")
    
    # Open input video
    cmd = ['ffmpeg', '-i', input_path, '-f', 'rawvideo', '-pix_fmt', 'rgb24',
           '-s', f'{orig_w}x{orig_h}', '-r', str(fps), '-']
    pipe = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL)
    
    # Open output video
    cmd = ['ffmpeg', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
           '-s', f'{out_w}x{out_h}', '-r', str(fps),
           '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '23',
           output_path]
    out_pipe = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.DEVNULL)
    
    frame_size = orig_w * orig_h * 3
    frame_count = 0
    
    while True:
        raw = pipe.stdout.read(frame_size)
        if len(raw) < frame_size:
            break
        
        frame = np.frombuffer(raw, dtype=np.uint8).reshape(orig_h, orig_w, 3)
        
        # Convert to ASCII
        ascii_art, colors, _, _ = frame_to_ascii(frame, width, charset, palette)
        
        # Render to image
        out_frame = render_ascii_frame(ascii_art, colors, cell_w, cell_h)
        
        # Write to output
        out_pipe.stdin.write(out_frame.tobytes())
        
        frame_count += 1
        if frame_count % 10 == 0:
            print(f"Processed {frame_count} frames...")
    
    # Close pipes
    pipe.stdout.close()
    out_pipe.stdin.close()
    out_pipe.wait()
    
    print(f"Done! Output: {output_path}")
    print(f"Total frames: {frame_count}")

def main():
    import argparse
    parser = argparse.ArgumentParser(description='Convert video to ASCII art')
    parser.add_argument('input', help='Input video file')
    parser.add_argument('-o', '--output', help='Output video file', default='ascii_output.mp4')
    parser.add_argument('-w', '--width', type=int, help='ASCII width in chars', default=120)
    parser.add_argument('-c', '--charset', choices=CHARSETS.keys(), default='standard')
    parser.add_argument('-p', '--palette', choices=PALETTES.keys(), default='green')
    parser.add_argument('-f', '--fps', type=int, help='Output FPS', default=24)
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input):
        print(f"Error: {args.input} not found")
        sys.exit(1)
    
    convert_video(args.input, args.output, args.width, args.charset, args.palette, args.fps)

if __name__ == '__main__':
    main()
