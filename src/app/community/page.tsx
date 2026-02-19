'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import { SearchIcon, HeartIcon, CommentIcon, PlusIcon } from '@/components/Icons';

/* ────────────────────────────────────────
   카테고리 데이터
──────────────────────────────────────── */
const categories = [
  { id: 'all', label: '전체' },
  { id: 'question', label: '질문' },
  { id: 'review', label: '후기' },
  { id: 'info', label: '정보공유' },
  { id: 'free', label: '자유' },
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  question: { bg: '#E8F0FE', text: '#4A90D9' },
  review: { bg: '#E8F5E9', text: '#4CAF50' },
  info: { bg: '#FFF3E0', text: '#FF9800' },
  free: { bg: '#F3E5F5', text: '#AB47BC' },
};

/* ────────────────────────────────────────
   게시글 목업 데이터
──────────────────────────────────────── */
const mockPosts = [
  {
    id: 1,
    category: 'review',
    categoryLabel: '후기',
    title: '임플란트 시술 3개월 후기 공유합니다',
    content: '안녕하세요, 3개월 전에 어금니 임플란트를 했는데요. 처음에는 걱정이 많았지만 지금은 정말 만족하고 있어요. 자연치아처럼 씹히고...',
    author: '건강한치아',
    date: '2시간 전',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    category: 'question',
    categoryLabel: '질문',
    title: '잇몸에서 피가 나는데 치과 가야 하나요?',
    content: '양치할 때마다 잇몸에서 피가 조금씩 나오는데, 통증은 없거든요. 이런 경우에도 치과에 가야 할까요? 아니면 잇몸 전용 치약을...',
    author: '치아초보',
    date: '5시간 전',
    likes: 15,
    comments: 12,
  },
  {
    id: 3,
    category: 'info',
    categoryLabel: '정보공유',
    title: '치과 보험 적용 항목 총정리 (2025년 기준)',
    content: '많은 분들이 치과 치료비 때문에 고민하시는데요, 건강보험이 적용되는 항목들을 한번 정리해봤습니다. 스케일링은 연 1회...',
    author: '치과정보통',
    date: '1일 전',
    likes: 89,
    comments: 23,
  },
  {
    id: 4,
    category: 'free',
    categoryLabel: '자유',
    title: '치과 갈 때마다 긴장되는 사람 저만 그런가요?',
    content: '어릴 때부터 치과만 가면 긴장이 돼서 손에 땀이 나요. 치료 자체는 안 아픈데도 그냥 무섭더라고요. 비슷한 분 계신가요?',
    author: '무서운이',
    date: '1일 전',
    likes: 42,
    comments: 31,
  },
  {
    id: 5,
    category: 'review',
    categoryLabel: '후기',
    title: '라미네이트 vs 올세라믹 고민하다 올세라믹 했어요',
    content: '앞니 4개를 올세라믹으로 했는데 자연스럽고 만족합니다. 비용은 개당 80만원 정도였고, 총 2주 걸렸어요. 라미네이트보다...',
    author: '예쁜미소',
    date: '2일 전',
    likes: 56,
    comments: 19,
  },
  {
    id: 6,
    category: 'question',
    categoryLabel: '질문',
    title: '사랑니 꼭 빼야 하나요? 아프지 않은데...',
    content: '사랑니가 비스듬히 나있는데 아프지는 않아요. 치과에서 빼는 게 좋다고 하는데, 안 아프면 그냥 둬도 되는 건지 궁금합니다.',
    author: '사랑니고민',
    date: '3일 전',
    likes: 33,
    comments: 27,
  },
  {
    id: 7,
    category: 'info',
    categoryLabel: '정보공유',
    title: '전동칫솔 vs 일반칫솔, 치과의사가 말하는 차이점',
    content: '치과의사인 지인에게 물어봤는데, 전동칫솔이 플라그 제거에 더 효과적이라고 합니다. 다만 올바른 사용법이 중요하다고...',
    author: '구강박사',
    date: '3일 전',
    likes: 71,
    comments: 14,
  },
];

/* ────────────────────────────────────────
   커뮤니티 페이지
──────────────────────────────────────── */
export default function CommunityPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      post.title.includes(searchQuery) ||
      post.content.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* ── 헤더 ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          width: '100%',
          maxWidth: 'var(--max-width)',
          height: 'var(--header-height)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 var(--spacing-xl)',
          background: 'var(--color-background-white)',
          zIndex: 200,
          borderBottom: '1px solid var(--color-border-light)',
        }}
      >
        <h1
          style={{
            fontSize: 'var(--font-xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          커뮤니티
        </h1>
      </header>

      <main className="page-container" style={{ background: 'var(--color-background-white)' }}>
        <div style={{ padding: '0 var(--spacing-xl)' }}>
          {/* ── 검색바 ── */}
          <div
            style={{
              marginTop: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-md)',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SearchIcon size={18} color="var(--color-text-tertiary)" />
            </div>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: 40,
                padding: '0 12px 0 38px',
                background: 'var(--color-background)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-lg)',
                fontSize: 'var(--font-md)',
                color: 'var(--color-text-primary)',
                transition: 'border-color 0.2s ease',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-primary)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border-light)';
              }}
            />
          </div>

          {/* ── 카테고리 탭 ── */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              overflowX: 'auto',
              paddingBottom: 'var(--spacing-md)',
              scrollbarWidth: 'none',
            }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    flexShrink: 0,
                    padding: '7px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-sm)',
                    fontWeight: isActive ? 600 : 500,
                    background: isActive ? 'var(--color-primary)' : 'var(--color-background)',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                    border: isActive ? 'none' : '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* ── 게시글 목록 ── */}
          <div>
            {filteredPosts.map((post, index) => {
              const catColor = categoryColors[post.category] || categoryColors.free;
              return (
                <React.Fragment key={post.id}>
                  <article
                    onClick={() => router.push(`/community/${post.id}`)}
                    style={{
                      padding: '16px 0',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    {/* 카테고리 태그 */}
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--font-xs)',
                        fontWeight: 600,
                        background: catColor.bg,
                        color: catColor.text,
                        marginBottom: 8,
                      }}
                    >
                      {post.categoryLabel}
                    </span>

                    {/* 제목 */}
                    <h3
                      style={{
                        fontSize: 'var(--font-base)',
                        fontWeight: 600,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.4,
                        marginBottom: 6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* 내용 미리보기 */}
                    <p
                      style={{
                        fontSize: 'var(--font-sm)',
                        color: 'var(--color-text-tertiary)',
                        lineHeight: 1.5,
                        marginBottom: 10,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {post.content}
                    </p>

                    {/* 하단 정보 */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        fontSize: 'var(--font-xs)',
                        color: 'var(--color-text-tertiary)',
                      }}
                    >
                      <span style={{ fontWeight: 500, color: 'var(--color-text-secondary)' }}>
                        {post.author}
                      </span>
                      <span>{post.date}</span>
                      <div style={{ flex: 1 }} />
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <HeartIcon size={14} color="var(--color-text-tertiary)" />
                        <span>{post.likes}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                        <CommentIcon size={14} color="var(--color-text-tertiary)" />
                        <span>{post.comments}</span>
                      </div>
                    </div>
                  </article>

                  {/* 구분선 */}
                  {index < filteredPosts.length - 1 && (
                    <div
                      style={{
                        height: 1,
                        background: 'var(--color-border-light)',
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}

            {filteredPosts.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 0',
                  color: 'var(--color-text-tertiary)',
                  fontSize: 'var(--font-md)',
                }}
              >
                게시글이 없습니다
              </div>
            )}
          </div>

          {/* 하단 여백 */}
          <div style={{ height: 80 }} />
        </div>
      </main>

      {/* ── 글쓰기 플로팅 버튼 ── */}
      <button
        onClick={() => router.push('/community/write')}
        style={{
          position: 'fixed',
          bottom: 'calc(var(--tabbar-height) + 16px)',
          right: 'calc(50% - min(215px, 50vw - 16px))',
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--color-primary)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(74, 144, 217, 0.4)',
          zIndex: 150,
          cursor: 'pointer',
          border: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
        aria-label="글쓰기"
      >
        <PlusIcon size={26} color="#FFFFFF" />
      </button>

      <TabBar />
    </>
  );
}
