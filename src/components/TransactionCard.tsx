import React from 'react'
import { toSvg } from 'jdenticon'
import type Transaction from '@/lib/chain/transaction'
import { formatDate, hexToString } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function Item({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-baseline">
      <span className="w-20 shrink-0 font-medium">{label}</span>
      <span className="overflow-hidden text-ellipsis text-sm">{value}</span>
    </div>
  )
}

function svgSrcFromHashValue(hash: string, svgSize: number = 40) {
  const svgString = toSvg(hash, svgSize)
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  return URL.createObjectURL(blob)
}

export default function TransactionCard({ tx }: { tx: Transaction }) {
  const src = React.useRef(svgSrcFromHashValue(tx.hash))
  const decodedData = React.useRef<string | null>(null)
  const [isDecodedData, setIsDecodedData] = React.useState(false)

  return (
    <Card>
      <CardHeader className="flex-row items-center gap-x-4">
        <Avatar className="bg-gray-200">
          <AvatarImage src={src.current} />
          <AvatarFallback>{tx.hash.slice(2, 4).toUpperCase()}</AvatarFallback>
        </Avatar>
        <CardTitle
          style={{ marginTop: 0 }}
          className="overflow-hidden text-ellipsis text-sm"
        >
          {tx.hash}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Item label="From" value={tx.from} />
        <Item label="To" value={tx.to} />
        <Item label="Value" value={tx.value} />
        <Item label="Status" value={tx.status} />
        <Item label="Date" value={formatDate(tx.createdAt)} />
        <Item label="Message" value={tx.message || ''} />
        <div className="flex items-baseline">
          <span className="w-20 shrink-0 font-medium">Data</span>
          <p
            className="min-w-0 break-words text-sm"
            onClick={() => {
              if (!tx.data) return

              if (!decodedData.current) {
                decodedData.current = hexToString(tx.data)
              }

              setIsDecodedData(state => !state)
            }}
          >
            {isDecodedData ? decodedData.current : tx.data}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
