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
import { Box, useTheme, useMediaQuery } from '@mui/material';
import type { ThreeKingdomsCharacter } from '@constants/three-kingdoms';
import { getKingdomMeta } from '@constants/three-kingdoms';
import { MultiFormatImage } from './MultiFormatImage';

/* Small component so we can use MultiFormatImage (which uses hooks) inside a table cell */
const AvatarCell = ({ character }: { character: ThreeKingdomsCharacter }) => {
  const km = getKingdomMeta(character.kingdom);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: `2px solid ${km.color}`,
          flexShrink: 0,
          overflow: 'hidden',
          backgroundColor: `${km.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MultiFormatImage
          basePath={`/images/three-kingdoms/avatar/${character.id}`}
          alt={character.name.en}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          fallback={
            <Box component="span" sx={{ fontWeight: 700, fontSize: '0.85rem', color: km.color }}>
              {character.name.cn.charAt(0)}
            </Box>
          }
        />
      </Box>
      <Box>
        <Box sx={{ fontWeight: 700, lineHeight: 1.2 }}>{character.name.cn}</Box>
        <Box sx={{ fontSize: '0.75rem', opacity: 0.7 }}>{character.name.vi} · {character.name.en}</Box>
      </Box>
    </Box>
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
  const { palette, breakpoints } = useTheme();
  const isLight = palette.mode === 'light';
  const isMobile = useMediaQuery(breakpoints.down('sm'));
  const parentRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<ThreeKingdomsCharacter, any>[] = useMemo(() => {
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
            <Box sx={{ color: km.color, fontWeight: 600, fontSize: '0.85rem' }}>
              {km.emoji} {km.name.en}
            </Box>
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
      base.splice(2, 0, columnHelper.accessor(row => row.hometown, {
        id: 'hometown',
        header: '📍 Hometown',
        cell: info => (
          <Box sx={{ fontSize: '0.82rem', opacity: 0.85 }}>
            {info.getValue()}
          </Box>
        ),
        size: 160,
        minSize: 120,
      }));

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
        }),
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
      return cn.toLowerCase().includes(s) || en.toLowerCase().includes(s) || vi.toLowerCase().includes(s);
    },
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60,
    overscan: 10,
  });

  const headerColor = isLight ? '#5C4A32' : '#FFE4B5';
  const rowHover = isLight ? 'rgba(184,137,31,0.06)' : 'rgba(245,208,96,0.06)';
  const borderColor = isLight ? 'rgba(184,137,31,0.15)' : 'rgba(245,208,96,0.15)';

  const headerColumns = table.getHeaderGroups()[0]?.headers ?? [];
  const gridCols = headerColumns.length > 0
    ? `${headerColumns[0].getSize()}px ${headerColumns.slice(1).map(() => '1fr').join(' ')}`
    : '1fr';

  return (
    <Box
      ref={parentRef}
      sx={{
        maxHeight: 'calc(100vh - 440px)',
        minHeight: 200,
        overflowY: 'auto',
        overflowX: 'auto',
        borderRadius: 2,
        border: `1px solid ${borderColor}`,
        width: '100%',
        backgroundColor: isLight ? 'rgba(255,248,240,0.5)' : 'rgba(11,13,46,0.35)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* Table header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: gridCols,
          position: 'sticky',
          top: 0,
          zIndex: 2,
          backgroundColor: isLight ? 'rgba(251,246,238,0.95)' : 'rgba(11,13,46,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${borderColor}`,
        }}
      >
        {table.getHeaderGroups().map(hg =>
          hg.headers.map(header => (
            <Box
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              sx={{
                px: 1.5,
                py: 1.5,
                fontSize: '0.8rem',
                fontWeight: 700,
                color: headerColor,
                cursor: header.column.getCanSort() ? 'pointer' : 'default',
                userSelect: 'none',
                whiteSpace: 'nowrap',
                '&:hover': header.column.getCanSort()
                  ? { backgroundColor: rowHover }
                  : {},
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
              {header.column.getIsSorted() === 'asc' && ' ▲'}
              {header.column.getIsSorted() === 'desc' && ' ▼'}
            </Box>
          )),
        )}
      </Box>

      {/* Virtualized rows */}
      <Box sx={{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }}>
        {virtualizer.getVirtualItems().map(vRow => {
          const row = rows[vRow.index];
          const km = getKingdomMeta(row.original.kingdom);

          return (
            <Box
              key={row.id}
              onClick={() => onRowClick(row.original)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter') onRowClick(row.original);
              }}
              sx={{
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
                cursor: 'pointer',
                transition: 'background-color 0.15s',
                '&:hover': { backgroundColor: rowHover },
                '&:focus-visible': {
                  outline: `2px solid ${palette.primary.main}`,
                  outlineOffset: -2,
                },
              }}
            >
              {row.getVisibleCells().map(cell => (
                <Box
                  key={cell.id}
                  sx={{
                    px: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.85rem',
                    color: palette.text.primary,
                    overflow: 'hidden',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Box>
              ))}
            </Box>
          );
        })}
      </Box>

      {/* Empty state */}
      {rows.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 6,
            color: palette.text.secondary,
            fontSize: '0.9rem',
          }}
        >
          No warriors found 🏯
        </Box>
      )}
    </Box>
  );
};

/* ─── Small stat cell with color scale ─── */
const StatCell = ({ value }: { value: number }) => {
  const color =
    value >= 90 ? '#C41E3A' : value >= 70 ? '#D4A843' : value >= 50 ? '#2E5090' : '#6B7280';
  return (
    <Box sx={{ fontWeight: value >= 90 ? 700 : 500, color, fontVariantNumeric: 'tabular-nums' }}>
      {value}
    </Box>
  );
};
