"use client";

import { Theme } from "@astryxdesign/core/theme";
import { matterTheme } from "@/matter";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Theme theme={matterTheme} mode="dark">
      {children}
    </Theme>
  );
}
