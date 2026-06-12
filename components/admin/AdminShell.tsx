"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Camera,
  Gem,
  Wrench,
  CalendarDays,
  Bookmark,
  GitCompare,
  MessageSquare,
  BarChart3,
  Settings,
  Menu,
  X,
} from "lucide-react";

const NAV = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "leads", label: "All Leads", icon: Users },
  { key: "instagram", label: "Instagram", icon: Camera },
  { key: "custom", label: "Custom", icon: Gem },
  { key: "repair", label: "Repairs", icon: Wrench },
  { key: "appointment", label: "Appointments", icon: CalendarDays },
  { key: "saved", label: "Saved Pieces", icon: Bookmark },
  { key: "compare", label: "Compare", icon: GitCompare },
  { key: "templates", label: "Templates", icon: MessageSquare },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "settings", label: "Settings", icon: Settings },
];

export function AdminShell({
  children,
  lang,
  activeView,
  onChangeView,
}: {
  children: ReactNode;
  lang: string;
  activeView: string;
  onChangeView: (v: string) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-ink flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-(--line) bg-ink-2 sticky top-0 h-screen">
        <div className="p-5 border-b border-(--line)">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <Image src="/brand/ormania.svg" alt="Ormania" width={120} height={28} className="h-6 w-auto opacity-80" />
          </Link>
          <p className="text-[0.7rem] text-text-3 mt-1 tracking-wide uppercase">Staff Dashboard</p>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onChangeView(item.key)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.85rem] transition-all duration-200",
                  active
                    ? "bg-gold/10 text-gold border border-gold/20"
                    : "text-text-2 hover:text-ivory hover:bg-[rgba(255,255,255,0.03)]"
                )}
              >
                <Icon size={16} strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-(--line)">
          <Link href={`/${lang}`} className="text-[0.8rem] text-text-3 hover:text-ivory transition-colors">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-ink-2 border-b border-(--line) px-4 py-3 flex items-center justify-between">
        <Image src="/brand/ormania.svg" alt="Ormania" width={100} height={24} className="h-5 w-auto opacity-80" />
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-ivory">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-ink-2 pt-14">
          <nav className="p-4 space-y-0.5">
            {NAV.map((item) => {
              const Icon = item.icon;
              const active = activeView === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => { onChangeView(item.key); setMobileOpen(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-[0.9rem] transition-all",
                    active ? "bg-gold/10 text-gold" : "text-text-2"
                  )}
                >
                  <Icon size={18} strokeWidth={1.5} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 lg:ml-0 pt-14 lg:pt-0">
        <div className="p-4 md:p-8 max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
