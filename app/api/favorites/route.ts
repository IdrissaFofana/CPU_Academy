import { NextRequest, NextResponse } from "next/server";

// Store favorites in memory (in production, use database + user authentication)
const favoritesStore = new Map<string, string[]>();

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID required" },
      { status: 400 }
    );
  }

  const favorites = favoritesStore.get(sessionId) || [];

  return NextResponse.json({ favorites }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { sessionId, parcoursId, action } = await request.json();

    if (!sessionId || !parcoursId || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let favorites = favoritesStore.get(sessionId) || [];

    if (action === "add") {
      if (!favorites.includes(parcoursId)) {
        favorites.push(parcoursId);
      }
    } else if (action === "remove") {
      favorites = favorites.filter((id) => id !== parcoursId);
    }

    favoritesStore.set(sessionId, favorites);

    return NextResponse.json(
      { success: true, favorites },
      { status: 200 }
    );
  } catch (error) {
    console.error("[Favorites API] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
