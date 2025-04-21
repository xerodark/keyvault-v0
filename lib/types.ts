// User types
export type KycStatus = "pending" | "verified" | "rejected"

export interface User {
  id: number
  name: string
  email: string
  kyc_status: KycStatus
  wallet_address?: string
  created_at: Date
  updated_at: Date
}

// Transaction types
export type TransactionType = "deposit" | "withdrawal" | "earnings"
export type TransactionStatus = "pending" | "completed" | "failed"
export type Currency = "USD" | "USDC"

export interface Transaction {
  id: number
  user_id: number
  type: TransactionType
  amount: number
  currency: Currency
  status: TransactionStatus
  description?: string
  created_at: Date
  updated_at: Date
}

// Portfolio types
export interface Portfolio {
  id: number
  user_id: number
  usdc_balance: number
  fund_ownership_percentage: number
  initial_investment: number
  current_value: number
  unrealized_gains: number
  created_at: Date
  updated_at: Date
}

// Fund Performance types
export interface FundPerformance {
  id: number
  date: Date
  nav: number
  aum: number
  quarterly_return: number
  ytd_return: number
  inception_return: number
  created_at: Date
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
