import { NextResponse } from "next/server"
import { createGreenAPIClient } from "@/lib/green-api"

export async function GET() {
  try {
    const client = createGreenAPIClient()

    if (!client) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Green API credentials not configured. Please set GREEN_API_INSTANCE_ID and GREEN_API_TOKEN environment variables.",
        },
        { status: 400 },
      )
    }

    const isConnected = await client.testConnection()

    if (isConnected) {
      const state = await client.getStateInstance()
      return NextResponse.json({
        success: true,
        status: state.stateInstance,
        message: "Green API connection successful",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to connect to Green API. Please check your credentials.",
        },
        { status: 401 },
      )
    }
  } catch (error) {
    console.error("[v0] Green API test connection error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
