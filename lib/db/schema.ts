import { pgTable, serial, text, varchar, timestamp, decimal, boolean } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

// Enum-like constants
export const KYC_STATUS = {
  PENDING: "pending",
  VERIFIED: "verified",
  REJECTED: "rejected",
} as const

export const TRANSACTION_TYPE = {
  DEPOSIT: "deposit",
  WITHDRAWAL: "withdrawal",
  EARNINGS: "earnings",
  FIAT_DEPOSIT: "fiat_deposit",
  USDC_CONVERSION: "usdc_conversion",
} as const

export const TRANSACTION_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
} as const

export const CURRENCY = {
  USD: "USD",
  USDC: "USDC",
} as const

export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const

export const REPORTING_FREQUENCY = {
  QUARTERLY: "quarterly",
  ANNUAL: "annual",
} as const

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 255 }),
  kycStatus: varchar("kyc_status", { length: 50 }).default(KYC_STATUS.PENDING),
  walletAddress: varchar("wallet_address", { length: 100 }),
  walletVerifiedAt: timestamp("wallet_verified_at", { withTimezone: true }),
  bankConnectionStatus: boolean("bank_connection_status").default(false),
  role: varchar("role", { length: 20 }).default(USER_ROLE.USER),
  reportingFrequency: varchar("reporting_frequency", { length: 20 }).default(REPORTING_FREQUENCY.QUARTERLY),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// User relations
export const usersRelations = relations(users, ({ one, many }) => ({
  portfolio: one(portfolios, {
    fields: [users.id],
    references: [portfolios.userId],
  }),
  transactions: many(transactions),
  performanceReports: many(performanceReports),
}))

// Portfolios table
export const portfolios = pgTable("portfolios", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" })
    .unique(),
  usdcBalance: decimal("usdc_balance", { precision: 18, scale: 6 }).default("0").notNull(),
  fundSharePercent: decimal("fund_share_percent", { precision: 10, scale: 6 }).default("0").notNull(),
  initialInvestment: decimal("initial_investment", { precision: 18, scale: 6 }).default("0").notNull(),
  currentValue: decimal("current_value", { precision: 18, scale: 6 }).default("0").notNull(),
  unrealizedGains: decimal("unrealized_gains", { precision: 18, scale: 6 }).default("0").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Portfolio relations
export const portfoliosRelations = relations(portfolios, ({ one }) => ({
  user: one(users, {
    fields: [portfolios.userId],
    references: [users.id],
  }),
}))

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: varchar("type", { length: 50 }).notNull(), // Using the TRANSACTION_TYPE enum values
  amount: decimal("amount", { precision: 18, scale: 6 }).notNull(),
  currency: varchar("currency", { length: 10 }).notNull(), // Using the CURRENCY enum values
  status: varchar("status", { length: 20 }).default(TRANSACTION_STATUS.PENDING),
  description: text("description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
})

// Transaction relations
export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id],
  }),
}))

// Fund Performance table
export const fundPerformance = pgTable("fund_performance", {
  id: serial("id").primaryKey(),
  date: timestamp("date", { withTimezone: true }).notNull().unique(),
  nav: decimal("nav", { precision: 18, scale: 6 }).notNull(),
  aum: decimal("aum", { precision: 18, scale: 6 }).notNull(),
  quarterlyReturn: decimal("quarterly_return", { precision: 10, scale: 6 }),
  ytdReturn: decimal("ytd_return", { precision: 10, scale: 6 }),
  inceptionReturn: decimal("inception_return", { precision: 10, scale: 6 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Fund Snapshots table
export const fundSnapshots = pgTable("fund_snapshots", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp", { withTimezone: true }).notNull(),
  quarter: varchar("quarter", { length: 10 }).notNull(), // e.g., "2025-Q2"
  totalAum: decimal("total_aum", { precision: 18, scale: 6 }).notNull(),
  nav: decimal("nav", { precision: 18, scale: 6 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Performance Reports table
export const performanceReports = pgTable("performance_reports", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id),
  period: varchar("period", { length: 10 }).notNull(), // e.g., "2025-Q2"
  gainLoss: decimal("gain_loss", { precision: 18, scale: 6 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
})

// Performance Report relations
export const performanceReportsRelations = relations(performanceReports, ({ one }) => ({
  user: one(users, {
    fields: [performanceReports.userId],
    references: [users.id],
  }),
}))

// Export all tables and relations;
