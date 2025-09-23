import React, { type ReactNode } from 'react';

interface ModernButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const ModernButton: React.FC<ModernButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
}) => {
  const baseClasses = 'btn-modern inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black';
  
  const variantClasses = {
    primary: 'btn-primary focus:ring-blue-500',
    secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500/30 shadow-glow-purple hover:shadow-glow-pink',
    outline: 'glass-button text-white border-2 border-blue-500/50 hover:bg-blue-500/20 hover:border-blue-400',
    ghost: 'text-white hover:bg-white/10 hover:shadow-modern',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm rounded-lg',
    md: 'px-4 py-2.5 text-base rounded-modern',
    lg: 'px-6 py-3 text-lg rounded-modern-lg',
    xl: 'px-8 py-4 text-xl rounded-modern-lg',
  };
  
  const disabledClasses = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'hover-lift';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={!disabled && !loading ? onClick : undefined}
      disabled={disabled || loading}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2">{icon}</span>
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <span className="ml-2">{icon}</span>
      )}
    </button>
  );
};

export default ModernButton;