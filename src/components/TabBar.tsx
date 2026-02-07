'use client';

import React from 'react';

interface TabItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface TabBarProps {
  items: TabItem[];
  onNavigate?: (href: string) => void;
}

export default function TabBar({ items, onNavigate }: TabBarProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 'var(--max-width)',
        height: 'var(--tabbar-height)',
        background: 'var(--color-background-white)',
        borderTop: '1px solid var(--color-border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 var(--spacing-sm)',
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        zIndex: 200,
        boxShadow: 'var(--shadow-tabbar)',
      }}
    >
      {items.map((item) => (
        <button
          key={item.href}
          onClick={() => onNavigate?.(item.href)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: '8px 12px',
            color: item.active ? 'var(--color-active)' : 'var(--color-inactive)',
            fontSize: 'var(--font-xs)',
            fontWeight: item.active ? 600 : 400,
            transition: 'color 0.2s ease',
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
