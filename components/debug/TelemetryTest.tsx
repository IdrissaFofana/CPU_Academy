"use client";

import { useState, useEffect } from "react";
import { useTelemetry } from "@/hooks/useStorage";

export function TelemetryTest() {
  const { trackViewModeChange, trackFavoriteToggle, sessionId } = useTelemetry();
  const [events, setEvents] = useState<string[]>([]);

  // Simulate tracking events
  useEffect(() => {
    const handleTrack = (event: Event) => {
      const e = event as CustomEvent;
      const message = `[${new Date().toLocaleTimeString()}] ${e.detail.type || "event"}`;
      setEvents((prev) => [message, ...prev.slice(0, 19)]);
    };

    window.addEventListener("telemetry-event", handleTrack);
    return () => window.removeEventListener("telemetry-event", handleTrack);
  }, []);

  const testTrack = () => {
    trackViewModeChange("grid", "/parcours");
    setEvents((prev) => [
      `[${new Date().toLocaleTimeString()}] view_mode_change: grid`,
      ...prev.slice(0, 19)
    ]);
  };

  return (
    <div className="fixed bottom-96 right-4 z-50 bg-slate-900 text-white p-4 rounded-lg text-xs max-w-sm shadow-lg max-h-64 overflow-y-auto">
      <h3 className="font-bold mb-3">📡 Telemetry Events</h3>
      
      <div className="mb-3 pb-3 border-b border-slate-700">
        <p className="text-slate-400">Session ID:</p>
        <p className="font-mono text-cpu-orange text-xs break-all">{sessionId}</p>
      </div>

      <button
        onClick={testTrack}
        className="w-full px-2 py-1 bg-cpu-orange hover:bg-orange-600 text-white rounded text-xs mb-3"
      >
        Test Track Event
      </button>

      <div className="space-y-1 font-mono text-slate-300">
        {events.length === 0 ? (
          <p className="text-slate-500">No events tracked yet...</p>
        ) : (
          events.map((event, i) => (
            <div key={i} className="text-xs truncate hover:text-white">
              {event}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
