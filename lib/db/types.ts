import type { InferSelectModel, InferInsertModel } from "drizzle-orm"
import type { users, portfolios, transactions, fundPerformance, fundSnapshots, performanceReports } from "./schema"

// Define types for selecting from tables
export type User = InferSelectModel<typeof users>
export type Portfolio = InferSelectModel<typeof portfolios>
export type Transaction = InferSelectModel<typeof transactions>
export type FundPerformance = InferSelectModel<typeof fundPerformance>
export type FundSnapshot = InferSelectModel<typeof fundSnapshots>
export type PerformanceReport = InferSelectModel<typeof performanceReports>

// Define types for inserting into tables
export type NewUser = InferInsertModel<typeof users>
export type NewPortfolio = InferInsertModel<typeof portfolios>
export type NewTransaction = InferInsertModel<typeof transactions>
export type NewFundPerformance = InferInsertModel<typeof fundPerformance>
export type NewFundSnapshot = InferInsertModel<typeof fundSnapshots>
export type NewPerformanceReport = InferInsertModel<typeof performanceReports>

// API Response type
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
