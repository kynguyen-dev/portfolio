import { useRef, useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnDef,
  type Row,
  type Cell,
} from '@tanstack/react-table';
import { useVirtualizer, type VirtualItem } from '@tanstack/react-virtual';
import { useSpring, animated, to } from '@react-spring/web';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';
import { getKingdomMeta } from '@constants/three-kingdoms';
import { MultiFormatImage } from './MultiFormatImage';
import { cn } from '@utils/core/cn';

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

const AvatarCell = ({ character }: { character: ThreeKingdomsCharacter }) => {
  const km = getKingdomMeta(character.kingdom);
  return (
    <div className='flex items-center gap-3'>
      <div
        className='w-10 h-10 rounded-full flex-shrink-0 overflow-hidden flex items-center justify-center p-0.5'
        style={{
          backgroundColor: `${km.color}20`,
          border: `1.5px solid ${km.color}50`,
        }}
      >
        <MultiFormatImage
          basePath={`/images/three-kingdoms/avatar/${character.id}`}
          alt={character.name.en}
          className='w-full h-full rounded-full object-cover'
          fallback={
            <span
              className='font-black text-[0.8rem] uppercase'
              style={{ color: km.color }}
            >
              {character.name.cn.charAt(0)}
            </span>
          }
        />
      </div>
      <div className='flex flex-col'>
        <div className='font-black text-ct-on-surface leading-tight'>
          {character.name.cn}
        </div>
        <div className='text-[0.7rem] font-bold text-ct-on-surface-variant/70 uppercase tracking-tighter'>
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

interface AnimatedRowProps {
  row: Row<ThreeKingdomsCharacter>;
  vRow: VirtualItem;
  gridCols: string;
  onRowClick: (character: ThreeKingdomsCharacter) => void;
  index: number;
}

const AnimatedRow = ({
  row,
  vRow,
  gridCols,
  onRowClick,
  index,
}: AnimatedRowProps) => {
  const km = getKingdomMeta(row.original.kingdom);
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered entry animation
  const spring = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    delay: Math.min(index * 50, 500),
    config: { tension: 200, friction: 20 },
  });

  // Spotlight effect
  const [{ sx, sy, sOpacity }, spotlightApi] = useSpring(() => ({
    sx: 0,
    sy: 0,
    sOpacity: 0,
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    spotlightApi.start({
      sx: e.clientX - rect.left,
      sy: e.clientY - rect.top,
      sOpacity: 1,
    });
  };

  return (
    <animated.div
      ref={containerRef}
      onClick={() => onRowClick(row.original)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => spotlightApi.start({ sOpacity: 0 })}
      role='button'
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter') onRowClick(row.original);
      }}
      style={{
        ...spring,
        display: 'grid',
        gridTemplateColumns: gridCols,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: `${vRow.size}px`,
        transform: to(
          [spring.x],
          x => `translateY(${vRow.start}px) translateX(${x}px)`
        ),
        borderLeft: `3px solid ${km.color}`,
      }}
      className='ghost-border border-b border-ct-outline-variant/10 cursor-pointer transition-colors duration-150 hover:bg-ct-surface-container-high/30 focus-visible:outline-2 focus-visible:outline-primary-main focus-visible:-outline-offset-2 overflow-hidden group'
    >
      {/* Spotlight highlight */}
      <animated.div
        style={{
          opacity: sOpacity,
          background: to(
            [sx, sy],
            (x, y) =>
              `radial-gradient(150px circle at ${x}px ${y}px, ${km.color}25, transparent 80%)`
          ),
        }}
        className='pointer-events-none absolute inset-0 z-0'
      />

      {row
        .getVisibleCells()
        .map((cell: Cell<ThreeKingdomsCharacter, unknown>) => (
          <div
            key={cell.id}
            className='px-3 flex items-center text-[0.85rem] text-ct-on-surface overflow-hidden relative z-10'
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        ))}
    </animated.div>
  );
};

export const CharacterTable = ({
  data,
  globalFilter,
  sorting,
  onSortingChange,
  onRowClick,
}: CharacterTableProps) => {
  const isMobile = useIsMobile();
  const parentRef = useRef<HTMLDivElement>(null);

  // ... (rest of the component logic until return) ...
  const columns: ColumnDef<ThreeKingdomsCharacter, unknown>[] = useMemo(() => {
    const base: ColumnDef<ThreeKingdomsCharacter, unknown>[] = [
      columnHelper.accessor(row => row.name.en, {
        id: 'name',
        header: '⚔ Warrior',
        cell: info => <AvatarCell character={info.row.original} />,
        enableSorting: true,
        size: 240,
        minSize: 180,
      }),
      columnHelper.accessor(row => row.kingdom, {
        id: 'kingdom',
        header: 'Allegiance',
        cell: info => {
          const km = getKingdomMeta(info.getValue());
          return (
            <span
              className='font-black text-[0.7rem] uppercase tracking-widest px-2 py-0.5 rounded-md'
              style={{ color: km.color, backgroundColor: `${km.color}15` }}
            >
              {km.emoji} {km.name.en}
            </span>
          );
        },
        size: 160,
        minSize: 120,
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
          header: '📍 Domain',
          cell: info => (
            <span className='text-[0.75rem] font-medium text-ct-on-surface-variant'>
              {info.getValue()}
            </span>
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
    estimateSize: () => 72,
    overscan: 10,
  });

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
      className='w-full overflow-x-auto overflow-y-auto'
      style={{
        maxHeight: '100%',
        minHeight: 200,
      }}
    >
      {/* Table header */}
      <div
        className='sticky top-0 z-[2] border-b border-ct-outline-variant/10 shadow-sm'
        style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          backgroundColor: isLight
            ? 'rgba(255,255,255,0.8)'
            : 'rgba(16,20,26,0.9)',
          backdropFilter: 'blur(16px)',
        }}
      >
        {table.getHeaderGroups().map(hg =>
          hg.headers.map(header => (
            <div
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className='px-4 py-4 hud-label text-[0.65rem] font-black whitespace-nowrap select-none flex items-center gap-1 transition-colors hover:text-ct-secondary active:scale-95'
              style={{
                cursor: header.column.getCanSort() ? 'pointer' : 'default',
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              <span className='text-[10px] opacity-40'>
                {header.column.getIsSorted() === 'asc' && ' ▴'}
                {header.column.getIsSorted() === 'desc' && ' ▾'}
              </span>
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
        {virtualizer.getVirtualItems().map((vRow, index) => {
          const row = rows[vRow.index];
          if (!row) return null;

          return (
            <AnimatedRow
              key={row.id}
              row={row}
              vRow={vRow}
              gridCols={gridCols}
              onRowClick={onRowClick}
              index={index}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {rows.length === 0 && (
        <div className='flex flex-col items-center justify-center py-20 gap-4 opacity-40'>
          <div className='text-4xl'>🏯</div>
          <div className='hud-label text-xs'>
            No warriors found in these archives
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Small stat cell with color scale ─── */
const StatCell = ({ value }: { value: number }) => {
  const isHigh = value >= 90;
  return (
    <span
      className={cn(
        'tabular-nums font-black text-xs px-2 py-1 rounded-sm',
        isHigh
          ? 'text-ct-secondary bg-ct-secondary/10'
          : 'text-ct-on-surface-variant'
      )}
    >
      {value}
    </span>
  );
};
