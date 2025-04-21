"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AdminFundSnapshotsProps {
  snapshots: any[]
}

export function AdminFundSnapshots({ snapshots }: AdminFundSnapshotsProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quarter</TableHead>
            <TableHead>Timestamp</TableHead>
            <TableHead className="text-right">Total AUM</TableHead>
            <TableHead className="text-right">NAV</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snapshots.map((snapshot) => (
            <TableRow key={snapshot.id}>
              <TableCell className="font-medium">{snapshot.quarter}</TableCell>
              <TableCell>{new Date(snapshot.timestamp).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">${Number(snapshot.total_aum).toLocaleString()}</TableCell>
              <TableCell className="text-right">{Number(snapshot.nav).toFixed(4)}</TableCell>
            </TableRow>
          ))}
          {snapshots.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                No fund snapshots available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
