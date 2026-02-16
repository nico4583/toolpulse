"use client";

import { useEffect } from "react";

type Props = {
  missingTop: boolean;
  missingBottom: boolean;
};

export function AdDebugWarn({ missingTop, missingBottom }: Props) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const missing: string[] = [];
    if (missingTop) missing.push("NEXT_PUBLIC_ADSENSE_SLOT_TOP");
    if (missingBottom) missing.push("NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM");
    if (missing.length > 0) {
      console.warn(`[AdSense] Missing slot env var(s): ${missing.join(", ")}`);
    }
  }, [missingTop, missingBottom]);

  return null;
}
