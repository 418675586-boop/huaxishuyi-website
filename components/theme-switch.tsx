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
        <div className="h-11 w-[148px] animate-pulse rounded-full border border-border bg-muted" />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div
      className="fixed right-6 bottom-[50px] z-50 flex items-center gap-1 rounded-full border border-border bg-background/90 p-1 shadow-lg backdrop-blur-md"
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
