"use client";

import { useState, useRef, useEffect } from "react";
import { TRANSITIONS } from "@/lib/design-tokens";

interface Tab {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
  badge?: "new" | "updated";
}

interface ImprovedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "line" | "pills" | "cards";
}

export function ImprovedTabs({
  tabs,
  defaultTab,
  onChange,
  variant = "line",
}: ImprovedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const tabsRef = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const activeEl = tabsRef.current[activeTab];
    if (activeEl && variant === "line") {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab, variant]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  if (variant === "line") {
    return (
      <div className="relative border-b border-slate-200">
        {/* Tabs Container - Scroll horizontal sur mobile */}
        <nav
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          role="tablist"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                tabsRef.current[tab.id] = el;
              }}
              onClick={() => handleTabChange(tab.id)}
              role="tab"
              aria-selected={activeTab === tab.id}
              className={`
                relative pb-4 px-2 font-medium text-sm whitespace-nowrap
                ${TRANSITIONS.fast}
                ${
                  activeTab === tab.id
                    ? "text-cpu-orange"
                    : "text-slate-600 hover:text-slate-900"
                }
                focus:outline-none focus-visible:ring-2 focus-visible:ring-cpu-orange focus-visible:ring-offset-2 rounded-sm
              `}
            >
              <span className="flex items-center gap-2">
                {tab.icon}
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 ${
                      activeTab === tab.id
                        ? "text-cpu-orange"
                        : "text-slate-400"
                    }`}
                  >
                    ({tab.count})
                  </span>
                )}
                {tab.badge && (
                  <span className="ml-1 px-1.5 py-0.5 bg-cpu-orange text-white text-xs rounded-full">
                    {tab.badge === "new" ? "Nouveau" : "Mis à jour"}
                  </span>
                )}
              </span>
            </button>
          ))}
        </nav>

        {/* Animated Indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-cpu-orange transition-all duration-300 ease-out"
          style={indicatorStyle}
        />
      </div>
    );
  }

  if (variant === "pills") {
    return (
      <nav className="flex flex-wrap gap-2" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`
              px-4 py-2 rounded-full font-medium text-sm
              ${TRANSITIONS.fast}
              ${
                activeTab === tab.id
                  ? "bg-cpu-orange text-white shadow-lg"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }
              focus:outline-none focus-visible:ring-2 focus-visible:ring-cpu-orange focus-visible:ring-offset-2
            `}
          >
            <span className="flex items-center gap-2">
              {tab.icon}
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={`ml-1 ${
                    activeTab === tab.id ? "opacity-90" : "opacity-70"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        ))}
      </nav>
    );
  }

  // variant === "cards"
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          role="tab"
          aria-selected={activeTab === tab.id}
          className={`
            p-4 rounded-lg text-left
            ${TRANSITIONS.default}
            ${
              activeTab === tab.id
                ? "bg-cpu-orange text-white shadow-xl ring-2 ring-cpu-orange ring-offset-2"
                : "bg-white text-slate-700 hover:shadow-lg border border-slate-200"
            }
            focus:outline-none focus-visible:ring-2 focus-visible:ring-cpu-orange focus-visible:ring-offset-2
          `}
        >
          <div className="flex items-start justify-between mb-2">
            {tab.icon && <div className="text-2xl">{tab.icon}</div>}
            {tab.count !== undefined && (
              <span
                className={`text-2xl font-bold ${
                  activeTab === tab.id ? "text-white" : "text-cpu-orange"
                }`}
              >
                {tab.count}
              </span>
            )}
          </div>
          <div className="font-semibold">{tab.label}</div>
        </button>
      ))}
    </div>
  );
}
