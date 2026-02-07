'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import TabBar from '@/components/TabBar';
import Card from '@/components/Card';
import { CalendarIcon, ChevronRightIcon, PlusIcon } from '@/components/Icons';

// ── Types ──────────────────────────────────────────────
interface VisitRecord {
  id: string;
  date: string;
  treatmentType: string;
  clinicName: string;
  description: string;
}

type FilterType = '전체' | '스케일링' | '충치치료' | '신경치료' | '기타';

// ── Treatment tag color mapping ──────────────────────
const treatmentColors: Record<string, { bg: string; color: string }> = {
  스케일링: { bg: 'var(--color-primary-bg)', color: 'var(--color-primary)' },
  충치치료: { bg: '#FFF3E0', color: 'var(--color-warning)' },
  신경치료: { bg: '#FFEBEE', color: 'var(--color-danger)' },
  레진: { bg: '#E8F5E9', color: 'var(--color-success)' },
  크라운: { bg: '#F3E5F5', color: '#9C27B0' },
  발치: { bg: '#FFEBEE', color: 'var(--color-danger)' },
  임플란트: { bg: '#E0F7FA', color: '#00838F' },
  인레이: { bg: '#FFF8E1', color: '#F57F17' },
  기타: { bg: '#F5F5F5', color: 'var(--color-text-secondary)' },
};

// ── Mock Data ────────────────────────────────────────
const mockRecords: VisitRecord[] = [
  {
    id: '1',
    date: '2025.03.12',
    treatmentType: '스케일링',
    clinicName: '서울밝은치과',
    description: '정기 스케일링 및 치석 제거 완료',
  },
  {
    id: '2',
    date: '2025.02.28',
    treatmentType: '충치치료',
    clinicName: '강남연세치과',
    description: '좌측 하단 어금니 레진 충전 치료',
  },
  {
    id: '3',
    date: '2025.01.15',
    treatmentType: '신경치료',
    clinicName: '서울밝은치과',
    description: '우측 상단 어금니 신경치료 1차',
  },
  {
    id: '4',
    date: '2024.12.20',
    treatmentType: '스케일링',
    clinicName: '미소드림치과',
    description: '하반기 정기 스케일링',
  },
  {
    id: '5',
    date: '2024.11.05',
    treatmentType: '기타',
    clinicName: '강남연세치과',
    description: '잇몸 염증 검진 및 약 처방',
  },
  {
    id: '6',
    date: '2024.09.18',
    treatmentType: '충치치료',
    clinicName: '서울밝은치과',
    description: '우측 상단 소구치 인레이 치료',
  },
];

// ── Filter classification ────────────────────────────
function matchesFilter(record: VisitRecord, filter: FilterType): boolean {
  if (filter === '전체') return true;
  if (filter === '기타') {
    return !['스케일링', '충치치료', '신경치료'].includes(record.treatmentType);
  }
  return record.treatmentType === filter;
}

// ── Component ────────────────────────────────────────
export default function RecordsPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<FilterType>('전체');

  const filters: FilterType[] = ['전체', '스케일링', '충치치료', '신경치료', '기타'];
  const filteredRecords = mockRecords.filter((r) => matchesFilter(r, activeFilter));

  return (
    <>
      <Header />
      <div className="page-container">
        {/* Page title */}
        <div style={{ padding: '20px var(--spacing-xl) 0' }}>
          <h1
            style={{
              fontSize: 'var(--font-xl)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            증상기록
          </h1>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '16px var(--spacing-xl)',
            overflowX: 'auto',
          }}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--font-sm)',
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? 'var(--color-primary)' : 'var(--color-background)',
                  color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                  border: isActive ? 'none' : '1px solid var(--color-border)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Records list */}
        <div style={{ padding: '0 var(--spacing-xl)', paddingBottom: '100px' }}>
          {filteredRecords.length === 0 ? (
            /* Empty state */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 20px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-primary-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                }}
              >
                <CalendarIcon size={32} color="var(--color-primary)" />
              </div>
              <p
                style={{
                  fontSize: 'var(--font-lg)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '8px',
                }}
              >
                아직 기록이 없어요
              </p>
              <p
                style={{
                  fontSize: 'var(--font-md)',
                  color: 'var(--color-text-tertiary)',
                  lineHeight: 1.5,
                }}
              >
                첫 방문 기록을 추가해보세요
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredRecords.map((record) => {
                const tagColor = treatmentColors[record.treatmentType] || treatmentColors['기타'];
                return (
                  <Card
                    key={record.id}
                    onClick={() => router.push(`/records/${record.id}`)}
                    style={{ padding: '16px 18px' }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {/* Left content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Date + treatment tag */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            marginBottom: '8px',
                          }}
                        >
                          <span
                            style={{
                              fontSize: 'var(--font-sm)',
                              color: 'var(--color-text-tertiary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <CalendarIcon size={14} color="var(--color-text-tertiary)" />
                            {record.date}
                          </span>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              padding: '3px 10px',
                              borderRadius: 'var(--radius-full)',
                              fontSize: '12px',
                              fontWeight: 600,
                              background: tagColor.bg,
                              color: tagColor.color,
                            }}
                          >
                            {record.treatmentType}
                          </span>
                        </div>

                        {/* Clinic name */}
                        <p
                          style={{
                            fontSize: 'var(--font-base)',
                            fontWeight: 600,
                            color: 'var(--color-text-primary)',
                            marginBottom: '4px',
                          }}
                        >
                          {record.clinicName}
                        </p>

                        {/* Description */}
                        <p
                          style={{
                            fontSize: 'var(--font-sm)',
                            color: 'var(--color-text-secondary)',
                            lineHeight: 1.4,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {record.description}
                        </p>
                      </div>

                      {/* Right chevron */}
                      <div style={{ flexShrink: 0, marginLeft: '12px' }}>
                        <ChevronRightIcon size={20} color="var(--color-text-tertiary)" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Floating add button */}
        <button
          onClick={() => router.push('/records/add')}
          style={{
            position: 'fixed',
            bottom: 'calc(var(--tabbar-height) + 16px)',
            right: 'calc(50% - 215px + 20px)',
            width: 56,
            height: 56,
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-primary)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(74, 144, 217, 0.4)',
            border: 'none',
            cursor: 'pointer',
            zIndex: 100,
            transition: 'transform 0.2s ease',
          }}
          aria-label="기록 추가"
        >
          <PlusIcon size={28} color="#FFFFFF" />
        </button>
      </div>
      <TabBar />
    </>
  );
}
