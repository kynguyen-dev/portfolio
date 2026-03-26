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
      className='w-full rounded-lg overflow-x-auto overflow-y-auto glass-panel bg-ct-surface-container-low/50 backdrop-blur-md'
      style={{
        maxHeight: 'calc(100vh - 440px)',
        minHeight: 200,
      }}
    >
      {/* Table header */}
      <div
        className='sticky top-0 z-[2] bg-ct-surface-container-low/95 backdrop-blur-xl border-b border-ct-outline-variant/20'
        style={{
          display: 'grid',
          gridTemplateColumns: gridCols,
        }}
      >
        {table.getHeaderGroups().map(hg =>
          hg.headers.map(header => (
            <div
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className='px-3 py-3 text-[0.8rem] font-bold whitespace-nowrap select-none text-ct-secondary'
              style={{
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
        {virtualizer.getVirtualItems().map(vRow => (
          <AnimatedRow
            key={vRow.key}
            row={rows[vRow.index]}
            vRow={vRow}
            gridCols={gridCols}
            onRowClick={onRowClick}
            index={vRow.index}
          />
        ))}
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
