"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore, type ReactNode } from "react";

function useIsMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function ThemeSwitch(): ReactNode {
  const mounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed right-6 bottom-[50px] z-50">
        <div className="h-11 w-[148px] animate-pulse rounded-full border border-white/50 bg-white/40 backdrop-blur-xl dark:border-white/15 dark:bg-white/10" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="fixed right-6 bottom-[50px] z-50 flex items-center gap-1 rounded-full border border-white/50 bg-white/40 p-1 shadow-[0_8px_30px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-xl dark:border-white/15 dark:bg-white/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)]"
      aria-label="颜色模式"
      role="group"
    >
      <button
        onClick={() => setTheme("light")}
        className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
          !isDark
            ? "bg-foreground text-background shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        aria-label="切换到浅色模式"
        aria-pressed={!isDark}
        type="button"
      >
        <Sun className="h-4 w-4" aria-hidden="true" />
        <span>浅色</span>
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`flex h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors ${
          isDark
            ? "bg-foreground text-background shadow-sm"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
        aria-label="切换到深色模式"
        aria-pressed={isDark}
        type="button"
      >
        <Moon className="h-4 w-4" aria-hidden="true" />
        <span>深色</span>
      </button>
    </div>
  );
}
