"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = {
  slot: string;
  className?: string;
  minHeight?: number;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, className, minHeight = 250 }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore ad push errors to avoid blocking page rendering.
    }
  }, [pathname, slot, className, minHeight]);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minHeight: 250, outline: "2px solid red" }}
      data-ad-client="ca-pub-4604662808401939"
      data-ad-slot="7492187911"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
