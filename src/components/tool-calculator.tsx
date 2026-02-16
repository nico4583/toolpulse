"use client";

import { useMemo, useState } from "react";
import { calculate } from "@/lib/calculators";
import type { Tool } from "@/lib/types";
import { formatCurrency, formatNumber } from "@/lib/seo";

type Props = {
  tool: Tool;
};

export function ToolCalculator({ tool }: Props) {
  const [values, setValues] = useState<Record<string, number>>(
    Object.fromEntries(tool.inputs.map((input) => [input.key, input.defaultValue])),
  );

  const result = useMemo(() => calculate(tool.mode, values), [tool.mode, values]);

  const formatted = tool.resultSuffix === "%"
    ? `${formatNumber(result.value, tool.precision ?? 2)}%`
    : tool.resultSuffix === "$"
      ? formatCurrency(result.value)
      : `${formatNumber(result.value, tool.precision ?? 2)}${tool.resultSuffix ? ` ${tool.resultSuffix}` : ""}`;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">Calculator</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {tool.inputs.map((input) => (
          <label key={input.key} className="block">
            <span className="text-sm font-medium text-slate-800">{input.label}</span>
            <span className="mt-1 block text-xs text-slate-500">{input.description}</span>
            <div className="mt-2 flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2">
              <input
                type="number"
                min={input.min}
                max={input.max}
                step={input.step ?? 1}
                className="w-full bg-transparent text-slate-900 outline-none"
                value={values[input.key]}
                onChange={(event) =>
                  setValues((prev) => ({
                    ...prev,
                    [input.key]: Number(event.target.value),
                  }))
                }
              />
              {input.suffix ? <span className="text-xs text-slate-500">{input.suffix}</span> : null}
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6 min-h-24 rounded-xl bg-slate-900 p-4 text-white">
        <p className="text-sm text-slate-300">{tool.resultLabel}</p>
        <p className="mt-1 text-3xl font-bold tracking-tight">{formatted}</p>
        <p className="mt-2 text-xs text-slate-300">{result.note}</p>
      </div>
    </section>
  );
}
