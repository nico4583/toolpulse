"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Entry = {
  title: string;
  href: string;
  type: "tool" | "guide";
};

export function SiteSearch() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data: Entry[]) => {
        if (mounted) setEntries(data);
      })
      .catch(() => {
        if (mounted) setEntries([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return entries.filter((entry) => entry.title.toLowerCase().includes(normalized)).slice(0, 8);
  }, [entries, query]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <label htmlFor="site-search" className="text-sm font-semibold text-slate-900">Search tools and guides</label>
      <input id="site-search" type="search" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-blue-200 focus:ring" placeholder="Search by topic" value={query} onChange={(event) => setQuery(event.target.value)} />
      {query ? (
        <ul className="mt-3 space-y-2">
          {matches.length > 0 ? (
            matches.map((entry) => (
              <li key={entry.href}>
                <Link href={entry.href} className="block rounded-md px-2 py-1 text-sm text-slate-700 hover:bg-slate-100">{entry.title} <span className="text-xs text-slate-500">({entry.type})</span></Link>
              </li>
            ))
          ) : (
            <li className="text-sm text-slate-500">No matches yet.</li>
          )}
        </ul>
      ) : null}
    </section>
  );
}
