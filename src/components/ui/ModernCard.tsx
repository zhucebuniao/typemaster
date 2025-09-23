import React, { type ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  gradient?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const ModernCard: React.FC<ModernCardProps> = ({
  children,
  className = '',
  hover = true,
  glow = false,
  gradient = false,
  onClick,
  disabled = false,
}) => {
  const baseClasses = 'card-modern transition-all duration-300 ease-out';
  const hoverClasses = hover && !disabled ? 'hover-lift cursor-pointer' : '';
  const glowClasses = glow ? 'card-glow' : '';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const cardContent = (
    <div className={`${baseClasses} ${hoverClasses} ${glowClasses} ${disabledClasses} ${className}`}>
      {children}
    </div>
  );

  if (gradient) {
    return (
      <div className={`gradient-border ${disabledClasses}`} onClick={!disabled ? onClick : undefined}>
        <div className="gradient-border-content p-6">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div onClick={!disabled ? onClick : undefined}>
      {cardContent}
    </div>
  );
};

export default ModernCard;