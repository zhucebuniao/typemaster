import React, { type ReactNode } from 'react';

interface FloatingActionButtonProps {
  children: ReactNode;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  onClick?: () => void;
  className?: string;
  tooltip?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  position = 'bottom-right',
  onClick,
  className = '',
  tooltip,
  variant = 'primary',
  size = 'md',
}) => {
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-glow-blue hover:shadow-glow-purple',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-glow-purple hover:shadow-glow-pink',
    success: 'bg-gradient-to-r from-green-600 to-emerald-600 shadow-glow-green',
    danger: 'bg-gradient-to-r from-red-600 to-pink-600 shadow-glow-pink',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50 group`}>
      <button
        onClick={onClick}
        className={`
          ${sizeClasses[size]} 
          ${variantClasses[variant]}
          glass-button rounded-full flex items-center justify-center
          text-white font-medium transition-all duration-300 ease-out
          hover-lift hover-scale active:scale-95
          ${className}
        `}
      >
        {children}
      </button>
      
      {tooltip && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black/80 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {tooltip}
          <div className="absolute top-full right-4 w-2 h-2 bg-black/80 rotate-45 transform -translate-y-1"></div>
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;