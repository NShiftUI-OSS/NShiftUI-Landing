import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <figure className="overflow-hidden rounded-xl bg-[#241c16] text-[#f6f1e7] ring-1 ring-black/10">
      {title ? (
        <figcaption className="border-b border-white/10 px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-[#f6f1e7]/65 uppercase">
          {title}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-4 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  )
}

export function H3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3 id={id} className="scroll-mt-28 font-serif text-2xl tracking-tight text-foreground">
      {children}
    </h3>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-[16.5px] leading-7 text-foreground/90">{children}</p>
}

export function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="font-medium text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary"
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  )
}

export function K({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-secondary px-1.5 py-0.5 text-[0.86em] text-foreground">{children}</code>
  )
}

export function DocTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div className="overflow-x-auto rounded-xl ring-1 ring-border">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-secondary/80 text-foreground">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-2 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("|")} className="border-t border-border bg-card">
              {row.map((cell) => (
                <td key={cell} className="px-3 py-2 align-top text-foreground/90">
                  <code className="font-mono text-[12.5px]">{cell}</code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DownloadLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button asChild size="lg">
      <a href={href} rel="noreferrer" target="_blank">
        {children}
      </a>
    </Button>
  )
}
