import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

export function CodeBlock({ code, title }: { code: string; title?: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border bg-muted/60">
      {title ? (
        <figcaption className="border-b px-3 py-1.5 text-xs text-muted-foreground">
          {title}
        </figcaption>
      ) : null}
      <pre className="overflow-x-auto p-3 text-[13px] leading-6">
        <code>{code}</code>
      </pre>
    </figure>
  )
}

export function Article({
  kicker,
  title,
  children,
}: {
  kicker: string
  title: string
  children: ReactNode
}) {
  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-10">
      <p className="text-sm text-muted-foreground">{kicker}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
      <div className="mt-8 space-y-5 text-[15px] leading-7">{children}</div>
    </article>
  )
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-20 pt-2 text-xl font-semibold tracking-tight">
      {children}
    </h2>
  )
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>
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
    <code className="rounded-md bg-muted px-1.5 py-0.5 text-[0.88em]">{children}</code>
  )
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>
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
                <td key={cell} className="px-3 py-2 align-top">
                  {cell}
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
