'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from './Icons';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export default function Header({ title, showBack = false, onBack, rightAction }: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 'var(--max-width)',
        height: 'var(--header-height)',
        background: 'var(--color-background-white)',
        borderBottom: '1px solid var(--color-border-light)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--spacing-lg)',
        zIndex: 200,
      }}
    >
      {showBack && (
        <button
          onClick={handleBack}
          style={{
            position: 'absolute',
            left: 'var(--spacing-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            color: 'var(--color-text-primary)',
          }}
          aria-label="뒤로 가기"
        >
          <ChevronLeftIcon size={24} />
        </button>
      )}
      <h1
        style={{
          fontSize: 'var(--font-lg)',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
        }}
      >
        {title}
      </h1>
      {rightAction && (
        <div style={{ position: 'absolute', right: 'var(--spacing-lg)' }}>
          {rightAction}
        </div>
      )}
    </header>
  );
}
