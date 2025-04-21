import { sql } from "drizzle-orm"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

async function main() {
  console.log("Starting migration from Prisma to Drizzle...")

  try {
    // Create a new connection to the database
    const migrationClient = drizzle(neon(process.env.DATABASE_URL!))

    // Create the schema
    console.log("Creating schema...")

    // Drop existing tables if they exist (be careful with this in production!)
    await migrationClient.execute(sql`
      DROP TABLE IF EXISTS performance_reports CASCADE;
      DROP TABLE IF EXISTS fund_snapshots CASCADE;
      DROP TABLE IF EXISTS fund_performance CASCADE;
      DROP TABLE IF EXISTS transactions CASCADE;
      DROP TABLE IF EXISTS portfolios CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `)

    // Create tables
    console.log("Creating users table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        hashed_password VARCHAR(255),
        kyc_status VARCHAR(50) DEFAULT 'pending',
        wallet_address VARCHAR(100),
        wallet_verified_at TIMESTAMP WITH TIME ZONE,
        bank_connection_status BOOLEAN DEFAULT false,
        role VARCHAR(20) DEFAULT 'user',
        reporting_frequency VARCHAR(20) DEFAULT 'quarterly',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Creating portfolios table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
        usdc_balance DECIMAL(18, 6) DEFAULT 0 NOT NULL,
        fund_share_percent DECIMAL(10, 6) DEFAULT 0 NOT NULL,
        initial_investment DECIMAL(18, 6) DEFAULT 0 NOT NULL,
        current_value DECIMAL(18, 6) DEFAULT 0 NOT NULL,
        unrealized_gains DECIMAL(18, 6) DEFAULT 0 NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Creating transactions table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        amount DECIMAL(18, 6) NOT NULL,
        currency VARCHAR(10) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending',
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Creating fund_performance table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS fund_performance (
        id SERIAL PRIMARY KEY,
        date TIMESTAMP WITH TIME ZONE NOT NULL UNIQUE,
        nav DECIMAL(18, 6) NOT NULL,
        aum DECIMAL(18, 6) NOT NULL,
        quarterly_return DECIMAL(10, 6),
        ytd_return DECIMAL(10, 6),
        inception_return DECIMAL(10, 6),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Creating fund_snapshots table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS fund_snapshots (
        id SERIAL PRIMARY KEY,
        timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
        quarter VARCHAR(10) NOT NULL,
        total_aum DECIMAL(18, 6) NOT NULL,
        nav DECIMAL(18, 6) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Creating performance_reports table...")
    await migrationClient.execute(sql`
      CREATE TABLE IF NOT EXISTS performance_reports (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id),
        period VARCHAR(10) NOT NULL,
        gain_loss DECIMAL(18, 6) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `)

    console.log("Migration completed successfully!")
  } catch (error) {
    console.error("Migration failed:", error)
  }
}

// Run the migration
main().catch(console.error)
