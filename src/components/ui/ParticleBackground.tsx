import React from 'react';

interface ParticleBackgroundProps {
  className?: string;
  density?: 'low' | 'medium' | 'high';
  colors?: string[];
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  density = 'medium',
  colors = ['rgba(99, 102, 241, 0.6)', 'rgba(139, 92, 246, 0.6)', 'rgba(236, 72, 153, 0.6)'],
}) => {
  const getDensityCount = () => {
    switch (density) {
      case 'low': return 30;
      case 'medium': return 50;
      case 'high': return 80;
      default: return 50;
    }
  };

  const particles = Array.from({ length: getDensityCount() }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`} style={{ zIndex: -1 }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full opacity-60 animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
      
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '100% 100%',
          animation: 'gradientFlow 15s ease-in-out infinite',
        }}
      />
    </div>
  );
};

export default ParticleBackground;