'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, HeartIcon, CommentIcon } from '@/components/Icons';

/* ────────────────────────────────────────
   카테고리 색상
──────────────────────────────────────── */
const categoryColors: Record<string, { bg: string; text: string }> = {
  review: { bg: '#E8F5E9', text: '#4CAF50' },
  question: { bg: '#E8F0FE', text: '#4A90D9' },
  info: { bg: '#FFF3E0', text: '#FF9800' },
  free: { bg: '#F3E5F5', text: '#AB47BC' },
};

/* ────────────────────────────────────────
   게시글 목업 데이터
──────────────────────────────────────── */
const mockPost = {
  id: 1,
  category: 'review',
  categoryLabel: '후기',
  title: '임플란트 시술 3개월 후기 공유합니다',
  author: '건강한치아',
  date: '2025.01.15',
  likes: 24,
  isLiked: false,
  isBookmarked: false,
  content: `안녕하세요, 3개월 전에 어금니 임플란트를 한 30대 직장인입니다.

임플란트 하기 전에 이 커뮤니티에서 정보를 많이 얻어서, 저도 후기를 남겨봅니다.

[시술 과정]
저는 오른쪽 아래 첫째 어금니에 임플란트를 했습니다. 발치 후 2개월 정도 기다렸다가 임플란트 식립을 했고, 그 후 3개월 정도 뼈 유착 기간을 거쳐서 최종 보철물을 씌웠어요.

총 기간은 약 5개월 정도 걸렸습니다.

[비용]
총 비용은 약 130만원 정도 들었어요. 병원마다 차이가 있겠지만, 저는 동네 치과에서 했고 오스템 임플란트를 사용했습니다.

[통증]
솔직히 시술 당일에는 마취 때문에 안 아팠는데, 마취 풀리고 나서 2-3일 정도는 욱신거렸어요. 진통제 먹으면 충분히 견딜 수 있는 정도였습니다.

[현재 상태]
지금은 자연치아처럼 편하게 씹을 수 있어요. 처음에 이물감이 좀 있었는데, 2주 정도 지나니까 적응됐습니다. 정말 만족하고 있습니다!

임플란트 고민하시는 분들께 도움이 되셨으면 좋겠습니다. 궁금한 점 있으시면 댓글로 물어봐주세요!`,
};

/* ────────────────────────────────────────
   댓글 목업 데이터
──────────────────────────────────────── */
interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: '치아건강맨',
    date: '2025.01.15',
    content: '좋은 후기 감사합니다! 저도 임플란트 고민 중인데 많이 도움이 됐어요. 혹시 시술 후에 음식 제한 같은 게 있었나요?',
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: '건강한치아',
        date: '2025.01.15',
        content: '시술 직후에는 부드러운 음식 위주로 먹었어요. 2주 정도 지나니까 거의 정상적으로 식사할 수 있었습니다!',
        likes: 3,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    author: '어금니파수꾼',
    date: '2025.01.16',
    content: '저도 같은 부위에 임플란트 했는데 정말 공감됩니다. 처음에 이물감 있다가 적응되면 진짜 편하죠!',
    likes: 8,
    isLiked: false,
  },
  {
    id: 3,
    author: '치과무서워',
    date: '2025.01.16',
    content: '130만원이면 적당한 편인가요? 다른 병원에서는 200만원 가까이 얘기하던데... 지역이 어디신지 여쭤봐도 될까요?',
    likes: 2,
    isLiked: false,
    replies: [
      {
        id: 31,
        author: '건강한치아',
        date: '2025.01.17',
        content: '서울 외곽 지역이에요. 강남이나 도심은 좀 더 비쌀 수 있어요. 여러 군데 상담 받아보시는 걸 추천드려요!',
        likes: 4,
        isLiked: false,
      },
    ],
  },
  {
    id: 4,
    author: '스마일퀸',
    date: '2025.01.18',
    content: '후기 감사합니다! 오스템 임플란트가 국산 중에서 괜찮은 편이라고 들었는데, 만족도가 높으시다니 다행이네요.',
    likes: 6,
    isLiked: false,
  },
  {
    id: 5,
    author: '대학생이',
    date: '2025.01.19',
    content: '마취 풀리고 나서 아프다는 게 좀 무섭긴 한데... 진통제로 충분하다니 그래도 다행인 것 같아요. 용기 내봐야겠습니다!',
    likes: 3,
    isLiked: false,
  },
];

/* ────────────────────────────────────────
   북마크 아이콘
──────────────────────────────────────── */
function BookmarkIcon({
  size = 24,
  color = 'currentColor',
  filled = false,
}: {
  size?: number;
  color?: string;
  filled?: boolean;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : 'none'}>
      <path
        d="M19 21L12 16L5 21V5C5 4.47 5.21 3.96 5.59 3.59C5.96 3.21 6.47 3 7 3H17C17.53 3 18.04 3.21 18.41 3.59C18.79 3.96 19 4.47 19 5V21Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────
   전송 아이콘
──────────────────────────────────────── */
function SendIcon({ size = 24, color = 'currentColor' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ────────────────────────────────────────
   댓글 컴포넌트
──────────────────────────────────────── */
function CommentItem({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply?: boolean;
}) {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likeCount, setLikeCount] = useState(comment.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div
      style={{
        padding: isReply ? '12px 0 12px 40px' : '14px 0',
        position: 'relative',
      }}
    >
      {/* 대댓글 연결선 */}
      {isReply && (
        <div
          style={{
            position: 'absolute',
            left: 16,
            top: 0,
            width: 14,
            height: 28,
            borderLeft: '1.5px solid var(--color-border-light)',
            borderBottom: '1.5px solid var(--color-border-light)',
            borderRadius: '0 0 0 8px',
          }}
        />
      )}

      <div style={{ display: 'flex', gap: 10 }}>
        {/* 아바타 */}
        <div
          style={{
            width: isReply ? 30 : 34,
            height: isReply ? 30 : 34,
            borderRadius: '50%',
            background: 'var(--color-background)',
            border: '1px solid var(--color-border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: isReply ? 'var(--font-xs)' : 'var(--font-sm)',
            color: 'var(--color-text-tertiary)',
          }}
        >
          {comment.author.charAt(0)}
        </div>

        {/* 내용 */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 'var(--font-sm)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              {comment.author}
            </span>
            <span
              style={{
                fontSize: 'var(--font-xs)',
                color: 'var(--color-text-tertiary)',
              }}
            >
              {comment.date}
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--font-md)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.55,
              marginBottom: 8,
              wordBreak: 'break-word',
            }}
          >
            {comment.content}
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <button
              onClick={handleLike}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 'var(--font-xs)',
                color: liked ? 'var(--color-danger)' : 'var(--color-text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <HeartIcon
                size={14}
                color={liked ? 'var(--color-danger)' : 'var(--color-text-tertiary)'}
              />
              {likeCount > 0 && likeCount}
            </button>
            {!isReply && (
              <button
                style={{
                  fontSize: 'var(--font-xs)',
                  color: 'var(--color-text-tertiary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  fontWeight: 500,
                }}
              >
                답글
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   게시글 상세 페이지
──────────────────────────────────────── */
export default function PostDetailPage() {
  const router = useRouter();
  const [liked, setLiked] = useState(mockPost.isLiked);
  const [likeCount, setLikeCount] = useState(mockPost.likes);
  const [bookmarked, setBookmarked] = useState(mockPost.isBookmarked);
  const [commentText, setCommentText] = useState('');

  const catColor = categoryColors[mockPost.category] || categoryColors.free;
  const totalComments = mockComments.reduce(
    (acc, c) => acc + 1 + (c.replies?.length || 0),
    0
  );

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

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
          padding: '0 var(--spacing-lg)',
          background: 'var(--color-background-white)',
          zIndex: 200,
          borderBottom: '1px solid var(--color-border-light)',
          gap: 12,
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}
          aria-label="뒤로가기"
        >
          <ArrowLeftIcon size={22} color="var(--color-text-primary)" />
        </button>
        <h1
          style={{
            fontSize: 'var(--font-xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
          }}
        >
          게시글
        </h1>
      </header>

      <main
        className="page-container-no-tab"
        style={{
          background: 'var(--color-background-white)',
          paddingBottom: 80,
        }}
      >
        <div style={{ padding: '0 var(--spacing-xl)' }}>
          {/* ── 게시글 본문 영역 ── */}
          <div style={{ paddingTop: 'var(--spacing-xl)' }}>
            {/* 카테고리 태그 */}
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                fontSize: 'var(--font-xs)',
                fontWeight: 600,
                background: catColor.bg,
                color: catColor.text,
                marginBottom: 12,
              }}
            >
              {mockPost.categoryLabel}
            </span>

            {/* 제목 */}
            <h2
              style={{
                fontSize: 'var(--font-xxl)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                lineHeight: 1.4,
                marginBottom: 16,
              }}
            >
              {mockPost.title}
            </h2>

            {/* 작성자 정보 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 20,
                paddingBottom: 16,
                borderBottom: '1px solid var(--color-border-light)',
              }}
            >
              {/* 아바타 */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: 'var(--color-primary-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 'var(--font-md)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                {mockPost.author.charAt(0)}
              </div>
              <div>
                <p
                  style={{
                    fontSize: 'var(--font-md)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 2,
                  }}
                >
                  {mockPost.author}
                </p>
                <p
                  style={{
                    fontSize: 'var(--font-xs)',
                    color: 'var(--color-text-tertiary)',
                  }}
                >
                  {mockPost.date}
                </p>
              </div>
            </div>

            {/* 본문 */}
            <div
              style={{
                fontSize: 'var(--font-base)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.75,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                marginBottom: 24,
              }}
            >
              {mockPost.content}
            </div>

            {/* 좋아요 / 북마크 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                paddingBottom: 16,
              }}
            >
              <button
                onClick={handleLike}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  background: liked ? '#FFEBEE' : 'var(--color-background)',
                  border: `1px solid ${liked ? 'var(--color-danger)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 500,
                  color: liked ? 'var(--color-danger)' : 'var(--color-text-secondary)',
                }}
              >
                <HeartIcon
                  size={16}
                  color={liked ? 'var(--color-danger)' : 'var(--color-text-secondary)'}
                />
                좋아요 {likeCount}
              </button>
              <button
                onClick={() => setBookmarked(!bookmarked)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  background: bookmarked ? 'var(--color-primary-bg)' : 'var(--color-background)',
                  border: `1px solid ${bookmarked ? 'var(--color-primary)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: 'var(--font-sm)',
                  fontWeight: 500,
                  color: bookmarked ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                }}
              >
                <BookmarkIcon
                  size={16}
                  color={bookmarked ? 'var(--color-primary)' : 'var(--color-text-secondary)'}
                  filled={bookmarked}
                />
                저장
              </button>
            </div>
          </div>

          {/* ── 구분선 ── */}
          <div
            style={{
              height: 8,
              background: 'var(--color-background)',
              margin: '0 calc(-1 * var(--spacing-xl))',
            }}
          />

          {/* ── 댓글 섹션 ── */}
          <div style={{ paddingTop: 'var(--spacing-lg)' }}>
            <h3
              style={{
                fontSize: 'var(--font-lg)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              댓글
              <span
                style={{
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                }}
              >
                {totalComments}
              </span>
            </h3>

            {/* 댓글 목록 */}
            <div>
              {mockComments.map((comment, index) => (
                <React.Fragment key={comment.id}>
                  <CommentItem comment={comment} />
                  {/* 대댓글 */}
                  {comment.replies?.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                  {index < mockComments.length - 1 && (
                    <div
                      style={{
                        height: 1,
                        background: 'var(--color-border-light)',
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* 하단 여백 */}
            <div style={{ height: 20 }} />
          </div>
        </div>
      </main>

      {/* ── 댓글 입력 바 ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100%',
          maxWidth: 'var(--max-width)',
          background: 'var(--color-background-white)',
          borderTop: '1px solid var(--color-border-light)',
          padding: '10px var(--spacing-xl)',
          paddingBottom: 'calc(10px + env(safe-area-inset-bottom, 0px))',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          style={{
            flex: 1,
            height: 40,
            padding: '0 14px',
            background: 'var(--color-background)',
            border: '1px solid var(--color-border-light)',
            borderRadius: 'var(--radius-full)',
            fontSize: 'var(--font-md)',
            color: 'var(--color-text-primary)',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-primary)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-border-light)';
          }}
        />
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: commentText.trim()
              ? 'var(--color-primary)'
              : 'var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: commentText.trim() ? 'pointer' : 'default',
            border: 'none',
            transition: 'background 0.2s ease',
            flexShrink: 0,
          }}
          aria-label="댓글 보내기"
        >
          <SendIcon size={18} color="#FFFFFF" />
        </button>
      </div>
    </>
  );
}
