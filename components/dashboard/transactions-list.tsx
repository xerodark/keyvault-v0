import type { FC } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownLeft, ArrowUpRight, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

interface TransactionsListProps {
  transactions?: any[]
}

export const TransactionsList: FC<TransactionsListProps> = ({ transactions = [] }) => {
  // If no transactions are provided, use sample data
  const transactionData =
    transactions.length > 0
      ? transactions
      : [
          {
            id: "tx1",
            type: "deposit",
            amount: 5000,
            date: "2023-04-12T10:45:00Z",
            status: "completed",
          },
          {
            id: "tx2",
            type: "earnings",
            amount: 750,
            date: "2023-04-10T14:30:00Z",
            status: "completed",
          },
          {
            id: "tx3",
            type: "withdrawal",
            amount: 2000,
            date: "2023-04-05T09:15:00Z",
            status: "completed",
          },
          {
            id: "tx4",
            type: "deposit",
            amount: 10000,
            date: "2023-03-28T11:20:00Z",
            status: "completed",
          },
          {
            id: "tx5",
            type: "earnings",
            amount: 1200,
            date: "2023-03-20T16:45:00Z",
            status: "completed",
          },
        ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />
      case "withdrawal":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />
      case "earnings":
        return <Coins className="h-4 w-4 text-primary" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <Card className="gradient-border card-hover col-span-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactionData.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-background">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div>
                  <p className="font-medium capitalize">{transaction.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(transaction.created_at || transaction.date)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={cn(
                    "font-medium",
                    transaction.type === "deposit" && "text-green-500",
                    transaction.type === "withdrawal" && "text-red-500",
                    transaction.type === "earnings" && "text-primary",
                  )}
                >
                  {transaction.type === "deposit" && "+"}
                  {transaction.type === "earnings" && "+"}
                  {transaction.type === "withdrawal" && "-"}${Number.parseFloat(transaction.amount).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
