'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'text' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  style,
  type = 'button',
}: ButtonProps) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    fontWeight: 600,
    borderRadius: 'var(--radius-button)',
    transition: 'all 0.2s ease',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '8px 16px', fontSize: 'var(--font-sm)' },
    md: { padding: '12px 24px', fontSize: 'var(--font-base)' },
    lg: { padding: '16px 32px', fontSize: 'var(--font-lg)', minHeight: 52 },
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--color-primary)',
      color: '#FFFFFF',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--color-primary)',
      border: '1.5px solid var(--color-primary)',
    },
    text: {
      background: 'transparent',
      color: 'var(--color-text-secondary)',
      border: 'none',
      padding: '8px 12px',
    },
    ghost: {
      background: 'var(--color-primary-bg)',
      color: 'var(--color-primary)',
      border: 'none',
    },
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
