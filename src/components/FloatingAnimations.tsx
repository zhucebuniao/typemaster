import React from 'react';
import type { FloatingAnimation } from '../types/game';

interface FloatingAnimationProps {
  animations: FloatingAnimation[];
  onAnimationComplete: (id: string) => void;
}

const FloatingAnimations: React.FC<FloatingAnimationProps> = ({ animations, onAnimationComplete }) => {
  const getAnimationClasses = (type: FloatingAnimation['type']) => {
    const baseClasses = "absolute pointer-events-none font-bold text-lg transform transition-all duration-1000 ease-out";
    
    switch (type) {
      case 'success':
        return `${baseClasses} text-green-400 animate-float-up`;
      case 'error':
        return `${baseClasses} text-red-400 animate-shake`;
      case 'combo':
        return `${baseClasses} text-yellow-400 animate-bounce-scale`;
      case 'level-up':
        return `${baseClasses} text-purple-400 animate-glow-pulse text-2xl`;
      default:
        return baseClasses;
    }
  };

  const getAnimationIcon = (type: FloatingAnimation['type']) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✗';
      case 'combo':
        return '🔥';
      case 'level-up':
        return '⬆️';
      default:
        return '';
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {animations.map((animation) => (
        <div
          key={animation.id}
          className={getAnimationClasses(animation.type)}
          style={{
            left: `${animation.x}%`,
            top: `${animation.y}%`,
            transform: `translate(-50%, -50%)`,
          }}
          onAnimationEnd={() => onAnimationComplete(animation.id)}
        >
          <div className="flex items-center space-x-1 drop-shadow-lg">
            <span className="text-xl">{getAnimationIcon(animation.type)}</span>
            <span 
              className="font-bold drop-shadow-md" 
              style={{ color: animation.color }}
            >
              {animation.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingAnimations;