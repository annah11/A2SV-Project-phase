import { NextResponse } from "next/server"
import jobsData from "../../data/jobs.json"

export async function GET() {
  try {
    return NextResponse.json(jobsData)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}
