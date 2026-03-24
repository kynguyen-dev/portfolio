import { useRef, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useThemeMode } from '@contexts/theme-mode';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';
import { getKingdomMeta } from '@constants/three-kingdoms';
import { MultiFormatImage } from './MultiFormatImage';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 600px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

import { useState, useEffect } from 'react';

const AvatarCell = ({ character }: { character: ThreeKingdomsCharacter }) => {
  const km = getKingdomMeta(character.kingdom);
  return (
    <div className='flex items-center gap-2'>
      <div
        className='w-9 h-9 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center'
        style={{
          border: `2px solid ${km.color}`,
          backgroundColor: `${km.color}20`,
        }}
      >
        <MultiFormatImage
          basePath={`/images/three-kingdoms/avatar/${character.id}`}
          alt={character.name.en}
          className='w-full h-full object-cover'
          fallback={
            <span
              className='font-bold text-[0.85rem]'
              style={{ color: km.color }}
            >
              {character.name.cn.charAt(0)}
            </span>
          }
        />
      </div>
      <div>
        <div className='font-bold leading-tight'>{character.name.cn}</div>
        <div className='text-xs opacity-70'>
          {character.name.vi} · {character.name.en}
        </div>
      </div>
    </div>
  );
};

const columnHelper = createColumnHelper<ThreeKingdomsCharacter>();

interface CharacterTableProps {
  data: ThreeKingdomsCharacter[];
  globalFilter: string;
  sorting: SortingState;
  onSortingChange: (s: SortingState) => void;
  onRowClick: (character: ThreeKingdomsCharacter) => void;
}

export const CharacterTable = ({
  data,
  globalFilter,
  sorting,
  onSortingChange,
  onRowClick,
}: CharacterTableProps) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const isMobile = useIsMobile();
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ThreeKingdomsCharacter, any>[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const base: ColumnDef<ThreeKingdomsCharacter, any>[] = [
      columnHelper.accessor(row => row.name.en, {
        id: 'name',
        header: '⚔ Name',
        cell: info => <AvatarCell character={info.row.original} />,
        enableSorting: true,
        size: 200,
        minSize: 140,
      }),
      columnHelper.accessor(row => row.kingdom, {
        id: 'kingdom',
        header: 'Kingdom',
        cell: info => {
          const km = getKingdomMeta(info.getValue());
          return (
            <span
              className='font-semibold text-[0.85rem]'
              style={{ color: km.color }}
            >
              {km.emoji} {km.name.en}
            </span>
          );
        },
        size: 140,
        minSize: 100,
      }),
      columnHelper.accessor(row => row.stats.might, {
        id: 'might',
        header: '💪 Might',
        cell: info => <StatCell value={info.getValue()} />,
        size: 100,
        minSize: 70,
      }),
    ];

    if (!isMobile) {
      base.splice(
        2,
        0,
        columnHelper.accessor(row => row.hometown, {
          id: 'hometown',
          header: '📍 Hometown',
          cell: info => (
            <span className='text-[0.82rem] opacity-85'>{info.getValue()}</span>
          ),
          size: 160,
          minSize: 120,
        })
      );

      base.push(
        columnHelper.accessor(row => row.stats.intelligence, {
          id: 'intelligence',
          header: '🧠 Intel',
          cell: info => <StatCell value={info.getValue()} />,
          size: 100,
          minSize: 70,
        }),
        columnHelper.accessor(row => row.stats.politics, {
          id: 'politics',
          header: '📜 Polit',
          cell: info => <StatCell value={info.getValue()} />,
          size: 100,
          minSize: 70,
        }),
        columnHelper.accessor(row => row.stats.charisma, {
          id: 'charisma',
          header: '✨ Charm',
          cell: info => <StatCell value={info.getValue()} />,
          size: 100,
          minSize: 70,
        }),
        columnHelper.accessor(row => row.stats.leadership, {
          id: 'leadership',
          header: '👑 Lead',
          cell: info => <StatCell value={info.getValue()} />,
          size: 100,
          minSize: 70,
        })
      );
    }

    return base;
  }, [isMobile]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: updater => {
      const next = typeof updater === 'function' ? updater(sorting) : updater;
      onSortingChange(next);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: (row, _columnId, filterValue: string) => {
      const s = filterValue.toLowerCase();
      const { cn, en, vi } = row.original.name;
      return (
        cn.toLowerCase().includes(s) ||
        en.toLowerCase().includes(s) ||
        vi.toLowerCase().includes(s)
      );
    },
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const borderColor = isLight
    ? 'rgba(184,137,31,0.15)'
    : 'rgba(245,208,96,0.15)';

  const headerColumns = table.getHeaderGroups()[0]?.headers ?? [];
  const gridCols =
    headerColumns.length > 0
      ? `${headerColumns[0].getSize()}px ${headerColumns
          .slice(1)
          .map(() => '1fr')
          .join(' ')}`
      : '1fr';

  return (
    <div
      ref={parentRef}
      className='w-full rounded-lg overflow-x-auto overflow-y-auto'
      style={{
        maxHeight: 'calc(100vh - 440px)',
        minHeight: 200,
        border: `1px solid ${borderColor}`,
        backgroundColor: isLight
          ? 'rgba(255,248,240,0.5)'
          : 'rgba(11,13,46,0.35)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Table header */}
      <div
        className='sticky top-0 z-[2]'
        style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          backgroundColor: isLight
            ? 'rgba(251,246,238,0.95)'
            : 'rgba(11,13,46,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {table.getHeaderGroups().map(hg =>
          hg.headers.map(header => (
            <div
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className='px-3 py-3 text-[0.8rem] font-bold whitespace-nowrap select-none'
              style={{
                color: isLight ? '#5C4A32' : '#FFE4B5',
                cursor: header.column.getCanSort() ? 'pointer' : 'default',
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() === 'asc' && ' ▲'}
              {header.column.getIsSorted() === 'desc' && ' ▼'}
            </div>
          ))
        )}
      </div>

      {/* Virtualized rows */}
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map(vRow => {
          const row = rows[vRow.index];
          const km = getKingdomMeta(row.original.kingdom);

          return (
            <div
              key={row.id}
              onClick={() => onRowClick(row.original)}
              role='button'
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') onRowClick(row.original);
              }}
              className='cursor-pointer transition-colors duration-150 hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-primary-main focus-visible:-outline-offset-2'
              style={{
                display: 'grid',
                gridTemplateColumns: gridCols,
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${vRow.size}px`,
                transform: `translateY(${vRow.start}px)`,
                borderBottom: `1px solid ${borderColor}`,
                borderLeft: `3px solid ${km.color}`,
              }}
            >
              {row.getVisibleCells().map(cell => (
                <div
                  key={cell.id}
                  className='px-3 flex items-center text-[0.85rem] text-ct-on-surface overflow-hidden'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className='text-center py-12 text-ct-on-surface-variant text-[0.9rem]'>
          No warriors found 🏯
        </div>
      )}
    </div>
  );
};

/* ─── Small stat cell with color scale ─── */
const StatCell = ({ value }: { value: number }) => {
  const color =
    value >= 90
      ? '#C41E3A'
      : value >= 70
        ? '#D4A843'
        : value >= 50
          ? '#2E5090'
          : '#6B7280';
  return (
    <span
      className='tabular-nums'
      style={{ fontWeight: value >= 90 ? 700 : 500, color }}
    >
      {value}
    </span>
  );
};
