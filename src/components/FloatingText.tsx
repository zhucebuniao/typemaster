import React, { useEffect, useState } from 'react';
import type { FloatingText } from '../types/game';

interface FloatingTextProps {
  floatingTexts: FloatingText[];
  onAnimationComplete: (id: string) => void;
}

const FloatingTextComponent: React.FC<FloatingTextProps> = ({ 
  floatingTexts, 
  onAnimationComplete 
}) => {
  const [visibleTexts, setVisibleTexts] = useState<FloatingText[]>([]);

  useEffect(() => {
    // Add new floating texts
    const newTexts = floatingTexts.filter(
      text => !visibleTexts.find(visible => visible.id === text.id)
    );
    
    if (newTexts.length > 0) {
      setVisibleTexts(prev => [...prev, ...newTexts]);
      
      // Remove texts after animation completes
      newTexts.forEach(text => {
        setTimeout(() => {
          setVisibleTexts(prev => prev.filter(visible => visible.id !== text.id));
          onAnimationComplete(text.id);
        }, 1000); // Match animation duration
      });
    }
  }, [floatingTexts, visibleTexts, onAnimationComplete]);

  const getTextStyle = (text: FloatingText) => {
    switch (text.type) {
      case 'score':
        return 'text-green-400 font-bold text-xl';
      case 'wpm':
        return 'text-blue-400 font-bold text-lg';
      case 'perfect':
        return 'text-yellow-400 font-bold text-2xl';
      case 'combo':
        return 'text-purple-400 font-bold text-lg';
      default:
        return 'text-white font-bold text-lg';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'score':
        return '💫';
      case 'wpm':
        return '⚡';
      case 'perfect':
        return '✨';
      case 'combo':
        return '🔥';
      default:
        return '⭐';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {visibleTexts.map((text) => (
        <div
          key={text.id}
          className={`absolute animate-float-up ${getTextStyle(text)}`}
          style={{
            left: `${text.x}px`,
            top: `${text.y}px`,
            textShadow: '0 0 10px rgba(0,0,0,0.5)',
          }}
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{getIcon(text.type)}</span>
            <span>{text.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloatingTextComponent;