import { NextRequest, NextResponse } from "next/server";

interface TelemetryEvent {
  type: "view_mode_change" | "favorite_toggle" | "card_click" | "card_impression";
  pageRoute: string;
  viewMode?: "grid" | "list" | "compact";
  timestamp: string;
  userId?: string;
  sessionId: string;
}

// Store telemetry events in memory (in production, use a database)
const telemetryStore: TelemetryEvent[] = [];

export async function POST(request: NextRequest) {
  try {
    const event: TelemetryEvent = await request.json();

    // Validate event
    if (!event.type || !event.pageRoute || !event.sessionId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Store event
    telemetryStore.push(event);

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("[Telemetry] Event recorded:", event);
    }

    // In production, you would:
    // 1. Save to database
    // 2. Send to analytics service (Mixpanel, Amplitude, etc.)
    // 3. Track user behavior patterns
    // 4. Monitor performance metrics

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Telemetry] Error processing event:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics summary (development only)
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available" }, { status: 403 });
  }

  const viewModeCounts = {
    grid: 0,
    list: 0,
    compact: 0
  };

  const eventCounts = {
    view_mode_change: 0,
    favorite_toggle: 0,
    card_click: 0,
    card_impression: 0
  };

  telemetryStore.forEach((event) => {
    if (event.viewMode) {
      viewModeCounts[event.viewMode]++;
    }
    eventCounts[event.type]++;
  });

  return NextResponse.json({
    totalEvents: telemetryStore.length,
    eventCounts,
    viewModeCounts,
    events: telemetryStore.slice(-100) // Return last 100 events
  });
}
