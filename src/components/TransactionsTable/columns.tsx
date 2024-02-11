import { ColumnDef } from '@tanstack/react-table'
import Transaction from '@/lib/chain/transaction'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import { CaretSortIcon } from '@radix-ui/react-icons'
import { formatDate } from '@/lib/utils'

export const columns: ColumnDef<Transaction>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'from',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          From
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <p className="lowercase">{row.getValue('from')}</p>,
  },
  {
    accessorKey: 'to',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          To
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    cell: ({ row }) => <p className="lowercase">{row.getValue('to')}</p>,
  },
  {
    accessorKey: 'value',
    header: 'Value',
    cell: ({ row }) => parseFloat(row.getValue('value')),
  },
  {
    accessorKey: 'message',
    header: 'Message',
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{row.getValue('message')}</span>
    ),
  },
  {
    accessorKey: 'data',
    header: 'Data',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created at',
    cell: ({ row }) => (
      <span className="whitespace-nowrap">
        {formatDate(row.getValue('createdAt'))}
      </span>
    ),
  },
]
