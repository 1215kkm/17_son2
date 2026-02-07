'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
  padding?: string;
}

export default function Card({ children, style, onClick, padding }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--color-background-card)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-card)',
        padding: padding || 'var(--spacing-xl)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
