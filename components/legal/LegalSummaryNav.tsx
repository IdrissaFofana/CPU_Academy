import type { ReactNode } from "react";

interface LegalSummaryNavItem {
  id: string;
  label: string;
}

interface LegalSummaryNavProps {
  title: string;
  subtitle: string;
  updatedAt: string;
  icon: ReactNode;
  items: LegalSummaryNavItem[];
}

export function LegalSummaryNav({
  title,
  subtitle,
  updatedAt,
  icon,
  items,
}: LegalSummaryNavProps) {
  return (
    <>
      <div className="lg:hidden mb-6 sm:mb-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-white">
        <div className="bg-[#1a1f2e] px-4 sm:px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F17425]/20 flex items-center justify-center flex-shrink-0 text-[#F17425]">
            {icon}
          </div>
          <div className="min-w-0">
            <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-semibold">
              Navigation
            </p>
            <p className="text-white font-bold text-sm sm:text-base leading-tight">
              {title}
            </p>
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50/70 px-3 py-3 hover:border-orange-200 hover:bg-orange-50 transition-all duration-150"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-500 group-hover:bg-[#F17425] group-hover:border-[#F17425] group-hover:text-white text-xs font-bold flex items-center justify-center transition-colors duration-150">
                  {index + 1}
                </span>
                <span className="text-sm sm:text-[15px] text-gray-600 group-hover:text-[#F17425] leading-snug transition-colors duration-150">
                  {item.label}
                </span>
              </a>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            Mise à jour : <span className="font-semibold text-gray-500">{updatedAt}</span>
          </p>
        </div>
      </div>

      <aside className="hidden lg:flex flex-col w-60 xl:w-64 flex-shrink-0 sticky top-0 h-screen">
        <div className="flex flex-col h-full rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-white">
          <div className="bg-[#1a1f2e] px-5 py-5 flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#F17425]/20 flex items-center justify-center flex-shrink-0 text-[#F17425]">
              {icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">
                Navigation
              </p>
              <p className="text-white font-bold text-sm leading-tight">{title}</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto bg-white py-3">
            {items.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="group flex items-start gap-3 px-4 py-2.5 border-l-2 border-transparent hover:border-[#F17425] hover:bg-orange-50/60 transition-all duration-150"
              >
                <span className="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-gray-100 group-hover:bg-[#F17425] text-gray-400 group-hover:text-white text-xs font-bold flex items-center justify-center transition-colors duration-150">
                  {index + 1}
                </span>
                <span className="text-base text-gray-500 group-hover:text-[#F17425] leading-snug transition-colors duration-150">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex-shrink-0">
            <p className="text-[10px] text-gray-400 leading-snug">
              {subtitle}
            </p>
            <p className="text-[10px] text-gray-400 leading-snug mt-1">
              Mise à jour : <span className="font-semibold text-gray-500">{updatedAt}</span>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
