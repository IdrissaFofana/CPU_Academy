export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] flex flex-col bg-white overflow-hidden">
      {/* ── Top progress bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#F17425] via-orange-400 to-yellow-300"
          style={{
            width: "100%",
            animation: "loading-bar 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />
      </div>

      {/* ── Centered brand block ── */}
      <div className="flex flex-col items-center justify-center flex-1 gap-8 px-6">
        {/* Logo placeholder / pulse */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#F17425] to-orange-400 flex items-center justify-center shadow-xl shadow-orange-200"
            style={{ animation: "logo-pulse 1.8s ease-in-out infinite" }}
          >
            <span className="text-white text-2xl font-black tracking-tight select-none">CPU</span>
          </div>
          <span className="text-base font-semibold text-gray-700 tracking-wide">
            CPU Formation
          </span>
        </div>

        {/* Progress track */}
        <div className="w-64 flex flex-col items-center gap-3">
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F17425] to-orange-300"
              style={{ animation: "progress-fill 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
            />
          </div>
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase">
            Chargement…
          </p>
        </div>
      </div>

      {/* ── Page skeleton preview ── */}
      <div className="px-4 pb-10 max-w-4xl mx-auto w-full space-y-4">
        {/* Hero-like block */}
        <div className="h-40 rounded-2xl bg-gray-100 animate-pulse" />
        {/* Card row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="h-24 rounded-xl bg-gray-100 animate-pulse" style={{ animationDelay: "0.1s" }} />
          <div className="h-24 rounded-xl bg-gray-100 animate-pulse" style={{ animationDelay: "0.2s" }} />
          <div className="h-24 rounded-xl bg-gray-100 animate-pulse" style={{ animationDelay: "0.3s" }} />
        </div>
        {/* Text lines */}
        <div className="space-y-2">
          <div className="h-3 rounded bg-gray-100 animate-pulse w-3/4" style={{ animationDelay: "0.15s" }} />
          <div className="h-3 rounded bg-gray-100 animate-pulse w-1/2" style={{ animationDelay: "0.25s" }} />
        </div>
      </div>

      {/* Keyframes injected via a style tag — no Tailwind plugin needed */}
      {/* eslint-disable-next-line react/no-danger */}
      <style>{`
        @keyframes loading-bar {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes progress-fill {
          0%   { width: 0%;   opacity: 1; }
          70%  { width: 85%;  opacity: 1; }
          90%  { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 10px 40px rgba(241,116,37,.25); }
          50%       { transform: scale(1.07); box-shadow: 0 16px 48px rgba(241,116,37,.45); }
        }
      `}</style>
    </div>
  );
}
