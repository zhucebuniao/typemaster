import type { PromptItem } from './types'

const now = new Date().toISOString()

export const initialPrompts: PromptItem[] = [
  {
    id: 'mountain-lake',
    title: '宁静的山间湖泊',
    prompt:
      'A serene mountain lake surrounded by pine trees and rocky peaks, crystal clear water reflecting the sky and mountains, soft natural sunlight, photorealistic, ultra detailed, 8k.',
    tags: ['自然', '风景', '湖泊'],
    note: '参考了瑞士阿尔卑斯山的景色。',
    imageUrl: 'https://images.unsplash.com/photo-1464822759844-d150ad6d13e5?auto=format&fit=crop&w=1200&q=80',
    isFavorite: true,
    createdAt: now,
    updatedAt: now,
    copyCount: 0,
  },
  {
    id: 'astronaut',
    title: '宇航员在陌生星球',
    prompt:
      'An astronaut standing on the surface of an alien planet, with distant planets in the sky, cinematic lighting, high contrast, epic composition.',
    tags: ['科幻', '人物'],
    imageUrl: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    copyCount: 0,
  },
  {
    id: 'rain-girl',
    title: '雨中的少女',
    prompt:
      'Anime style girl standing in the rain, city lights background, melancholic mood, wet hair details, dramatic rim light.',
    tags: ['插画', '人物'],
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    isFavorite: false,
    createdAt: now,
    updatedAt: now,
    copyCount: 0,
  },
]

export const hotTags = ['风景', '建筑', '人物', '科幻', '插画', '室内']
