import { type NextRequest, NextResponse } from "next/server"
import { executeQuery } from "@/lib/db"
import type { ApiResponse, FundPerformance } from "@/lib/types"

// GET /api/fund-performance/[id] - Get a specific fund performance record
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<FundPerformance>>> {
  try {
    const recordId = params.id

    const record = await executeQuery("SELECT * FROM fund_performance WHERE id = $1", [recordId])

    if (record.length === 0) {
      return NextResponse.json({ success: false, error: "Fund performance record not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: record[0] })
  } catch (error) {
    console.error("Error fetching fund performance record:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch fund performance record" }, { status: 500 })
  }
}

// PUT /api/fund-performance/[id] - Update a fund performance record
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<FundPerformance>>> {
  try {
    const recordId = params.id
    const { nav, aum, quarterly_return, ytd_return, inception_return } = await request.json()

    // Check if record exists
    const existingRecord = await executeQuery("SELECT * FROM fund_performance WHERE id = $1", [recordId])

    if (existingRecord.length === 0) {
      return NextResponse.json({ success: false, error: "Fund performance record not found" }, { status: 404 })
    }

    // Update record
    const result = await executeQuery(
      `UPDATE fund_performance
       SET nav = $1, aum = $2, quarterly_return = $3, ytd_return = $4, inception_return = $5
       WHERE id = $6
       RETURNING *`,
      [
        nav !== undefined ? nav : existingRecord[0].nav,
        aum !== undefined ? aum : existingRecord[0].aum,
        quarterly_return !== undefined ? quarterly_return : existingRecord[0].quarterly_return,
        ytd_return !== undefined ? ytd_return : existingRecord[0].ytd_return,
        inception_return !== undefined ? inception_return : existingRecord[0].inception_return,
        recordId,
      ],
    )

    return NextResponse.json({ success: true, data: result[0] })
  } catch (error) {
    console.error("Error updating fund performance record:", error)
    return NextResponse.json({ success: false, error: "Failed to update fund performance record" }, { status: 500 })
  }
}

// DELETE /api/fund-performance/[id] - Delete a fund performance record
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse<ApiResponse<null>>> {
  try {
    const recordId = params.id

    // Check if record exists
    const existingRecord = await executeQuery("SELECT * FROM fund_performance WHERE id = $1", [recordId])

    if (existingRecord.length === 0) {
      return NextResponse.json({ success: false, error: "Fund performance record not found" }, { status: 404 })
    }

    // Delete record
    await executeQuery("DELETE FROM fund_performance WHERE id = $1", [recordId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting fund performance record:", error)
    return NextResponse.json({ success: false, error: "Failed to delete fund performance record" }, { status: 500 })
  }
}
