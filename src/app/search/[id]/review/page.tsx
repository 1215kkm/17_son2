'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import { StarIcon } from '@/components/Icons';

/* ────────────────────────────────────────
   Mock Review Data
──────────────────────────────────────── */
const overallRating = 4.8;
const totalReviews = 312;
const ratingDistribution = [
  { stars: 5, count: 215, percentage: 69 },
  { stars: 4, count: 62, percentage: 20 },
  { stars: 3, count: 22, percentage: 7 },
  { stars: 2, count: 8, percentage: 3 },
  { stars: 1, count: 5, percentage: 1 },
];

const sortOptions = ['최신순', '평점높은순', '평점낮은순'];

const mockReviews = [
  {
    id: '1',
    author: '김**',
    rating: 5,
    date: '2025.01.15',
    treatment: '임플란트',
    text: '의사 선생님이 정말 친절하시고 꼼꼼하게 설명해주셔서 안심하고 치료받았습니다. 시설도 깨끗하고 대기 시간도 짧았어요. 임플란트 수술도 생각보다 아프지 않았고 회복도 빨랐습니다.',
    helpfulCount: 24,
  },
  {
    id: '2',
    author: '이**',
    rating: 4,
    date: '2025.01.10',
    treatment: '스케일링',
    text: '스케일링 받으러 갔는데 빠르고 깔끔하게 해주셨습니다. 다만 주차가 좀 불편했어요. 스케일링 후 관리 방법도 자세하게 알려주셔서 좋았습니다.',
    helpfulCount: 18,
  },
  {
    id: '3',
    author: '박**',
    rating: 5,
    date: '2025.01.05',
    treatment: '치아교정',
    text: '교정 상담 받았는데 여러 옵션을 자세히 설명해주시고 강압적이지 않아서 좋았습니다. 투명교정으로 결정했는데 만족합니다.',
    helpfulCount: 31,
  },
  {
    id: '4',
    author: '최**',
    rating: 5,
    date: '2024.12.28',
    treatment: '충치치료',
    text: '충치가 심해서 걱정했는데 레진으로 깔끔하게 치료해주셨어요. 통증도 거의 없었고 마취도 잘 해주셨습니다. 앞으로도 여기 다닐 예정입니다.',
    helpfulCount: 15,
  },
  {
    id: '5',
    author: '정**',
    rating: 3,
    date: '2024.12.20',
    treatment: '미백',
    text: '미백 시술을 받았는데 효과는 확실하게 있었습니다. 다만 시술 후 시린 증상이 며칠간 좀 있었어요. 전반적으로는 만족합니다.',
    helpfulCount: 8,
  },
  {
    id: '6',
    author: '한**',
    rating: 5,
    date: '2024.12.15',
    treatment: '신경치료',
    text: '다른 곳에서 신경치료를 실패해서 재치료를 받으러 왔는데, 정말 꼼꼼하게 치료해주셔서 통증이 사라졌습니다. 실력이 좋으신 것 같아요.',
    helpfulCount: 42,
  },
  {
    id: '7',
    author: '윤**',
    rating: 4,
    date: '2024.12.10',
    treatment: '크라운',
    text: '크라운 치료를 받았는데 색상 매칭이 잘 되어서 자연스럽습니다. 직원분들도 친절하고 예약 시간에 맞게 진료해주셔서 좋았어요.',
    helpfulCount: 11,
  },
];

/* ────────────────────────────────────────
   Review List Page
──────────────────────────────────────── */
export default function ReviewListPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [activeSort, setActiveSort] = useState('최신순');
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

  const toggleHelpful = (reviewId: string) => {
    setHelpfulReviews((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  };

  return (
    <>
      <Header
        title="리뷰"
        showBack
        onBack={() => router.back()}
        showNotification={false}
        showProfile={false}
      />

      <main className="page-container-no-tab" style={{ background: 'var(--color-background)', paddingBottom: 100 }}>
        <div style={{ padding: '0 var(--spacing-xl)' }}>

          {/* Overall Rating Summary */}
          <Card style={{ marginTop: 'var(--spacing-lg)' }} padding="20px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              {/* Big Rating Number */}
              <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '44px', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1 }}>
                  {overallRating}
                </div>
                <div style={{ display: 'flex', gap: 3, marginTop: 8, justifyContent: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={16}
                      color={star <= Math.floor(overallRating) ? '#FBBF24' : '#E0E6ED'}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 'var(--font-sm)',
                    color: 'var(--color-text-tertiary)',
                    marginTop: 4,
                  }}
                >
                  {totalReviews}개 리뷰
                </div>
              </div>

              {/* Distribution Bars */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {ratingDistribution.map((item) => (
                  <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)', minWidth: 12, textAlign: 'right' }}>
                      {item.stars}
                    </span>
                    <StarIcon size={12} color="#FBBF24" />
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        borderRadius: 4,
                        background: 'var(--color-border)',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          height: '100%',
                          borderRadius: 4,
                          background: item.stars >= 4 ? '#FBBF24' : item.stars === 3 ? '#FFD54F' : '#FFB74D',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </div>
                    <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)', minWidth: 28, textAlign: 'right' }}>
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Sort Filter */}
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginTop: 'var(--spacing-lg)',
              marginBottom: 'var(--spacing-md)',
            }}
          >
            {sortOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setActiveSort(opt)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 500,
                  border: activeSort === opt ? 'none' : '1px solid var(--color-border)',
                  background: activeSort === opt ? 'var(--color-primary)' : 'var(--color-background-white)',
                  color: activeSort === opt ? '#FFFFFF' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Review Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {mockReviews.map((review) => (
              <Card key={review.id} padding="16px">
                {/* Header: Author & Date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--color-primary-bg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--font-sm)',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                      }}
                    >
                      {review.author.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: 'var(--font-md)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {review.author}
                      </div>
                      <span style={{ fontSize: 'var(--font-xs)', color: 'var(--color-text-tertiary)' }}>
                        {review.date}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      size={14}
                      color={star <= review.rating ? '#FBBF24' : '#E0E6ED'}
                    />
                  ))}
                </div>

                {/* Treatment Tag */}
                <span
                  style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-primary-bg)',
                    color: 'var(--color-primary)',
                    fontSize: 'var(--font-xs)',
                    fontWeight: 500,
                    marginBottom: 10,
                  }}
                >
                  {review.treatment}
                </span>

                {/* Review Text */}
                <p
                  style={{
                    fontSize: 'var(--font-md)',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: 12,
                  }}
                >
                  {review.text}
                </p>

                {/* Helpful Button */}
                <button
                  onClick={() => toggleHelpful(review.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-full)',
                    border: helpfulReviews[review.id]
                      ? '1px solid var(--color-primary)'
                      : '1px solid var(--color-border)',
                    background: helpfulReviews[review.id] ? 'var(--color-primary-bg)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: 'var(--font-sm)' }}>
                    {helpfulReviews[review.id] ? String.fromCodePoint(0x1F44D) : String.fromCodePoint(0x1F44D)}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--font-sm)',
                      color: helpfulReviews[review.id] ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
                      fontWeight: helpfulReviews[review.id] ? 600 : 400,
                    }}
                  >
                    도움이 돼요 {review.helpfulCount + (helpfulReviews[review.id] ? 1 : 0)}
                  </span>
                </button>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Floating Write Review Button */}
      <button
        onClick={() => router.push(`/search/${id}/review/write`)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: '50%',
          transform: 'translateX(calc(min(215px, 50vw - 24px)))',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '14px 24px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--color-primary)',
          color: '#FFFFFF',
          fontSize: 'var(--font-base)',
          fontWeight: 600,
          boxShadow: '0 4px 16px rgba(74, 144, 217, 0.4)',
          cursor: 'pointer',
          zIndex: 100,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20H21" />
          <path d="M16.5 3.5C16.9 3.1 17.44 2.88 18 2.88C18.56 2.88 19.1 3.1 19.5 3.5C19.9 3.9 20.12 4.44 20.12 5C20.12 5.56 19.9 6.1 19.5 6.5L7 19L3 20L4 16L16.5 3.5Z" />
        </svg>
        리뷰 작성
      </button>
    </>
  );
}
