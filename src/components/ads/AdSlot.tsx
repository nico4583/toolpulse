"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Props = {
  client: string;
  slot: string;
  className?: string;
  minHeight?: number;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ client, slot, className, minHeight = 250 }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // Ignore ad push errors to avoid blocking page rendering.
    }
  }, [client, slot, pathname]);

  if (!client || !slot) return null;

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`.trim()}
      style={{ display: "block", minHeight }}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
