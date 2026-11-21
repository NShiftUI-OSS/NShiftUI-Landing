import { useState } from "react"
import type { ReactNode } from "react"

import { groupContains, groups, neighbors, overview, pageByPath, type DocGroup } from "@/docs/nav"
import { href, useRoute } from "@/docs/use-route"
import { cn } from "cn"

const mark = `${import.meta.env.BASE_URL}favicon.svg`

export function DocsShell({ children }: { children: ReactNode }) {
  const path = useRoute()
  const page = pageByPath(path)
  const { previous, next } = neighbors(path)
  const [menu, setMenu] = useState(false)
  const [manual, setManual] = useState<Record<string, boolean>>({})

  function expanded(id: string, contains: boolean, top: boolean) {
    if (id in manual) return manual[id]
    if (top) return true
    return contains
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <a href={href(overview.path)} className="flex h-14 shrink-0 items-center gap-2.5 border-b px-4 font-semibold">
        <img src={mark} alt="" className="size-8 rounded-md" />
        NShiftUI
      </a>
      <nav aria-label="Documentação" className="flex-1 overflow-y-auto px-2 py-3">
        <a
          href={href(overview.path)}
          aria-current={path === overview.path ? "page" : undefined}
          className={cn(
            "block rounded-md px-2 py-1.5 text-sm",
            path === overview.path ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent",
          )}
          onClick={() => setMenu(false)}
        >
          {overview.title}
        </a>
        {groups.map((group) => (
          <NavGroup
            key={group.id}
            group={group}
            path={path}
            top
            expanded={expanded}
            onToggle={(id, open) => setManual((current) => ({ ...current, [id]: !open }))}
            onNavigate={() => setMenu(false)}
          />
        ))}
      </nav>
      <div className="border-t p-2">
        <ThemeToggle />
      </div>
    </div>
  )

  return (
    <div className="min-h-svh bg-background md:grid md:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="bg-sidebar text-sidebar-foreground sticky top-0 hidden h-svh border-r md:block">
        {sidebar}
      </aside>
      {menu ? (
        <div className="fixed inset-0 z-30 md:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenu(false)}
          />
          <aside className="bg-sidebar text-sidebar-foreground relative h-full w-72 border-r">{sidebar}</aside>
        </div>
      ) : null}
      <div className="min-w-0">
        <header className="bg-background/95 sticky top-0 z-10 flex h-14 items-center gap-3 border-b px-4 backdrop-blur md:px-8">
          <button
            type="button"
            className="rounded-md border px-2 py-1 text-sm md:hidden"
            onClick={() => setMenu(true)}
          >
            Menu
          </button>
          <p className="truncate text-sm text-muted-foreground">{page?.title}</p>
        </header>
        {children}
        <nav className="mx-auto flex max-w-3xl justify-between gap-4 px-6 pb-12 sm:px-10">
          {previous ? (
            <a href={href(previous.path)} className="text-sm underline-offset-4 hover:underline">
              {previous.title}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={href(next.path)} className="text-sm underline-offset-4 hover:underline">
              {next.title}
            </a>
          ) : null}
        </nav>
      </div>
    </div>
  )
}

function NavGroup({
  group,
  path,
  top,
  expanded,
  onToggle,
  onNavigate,
}: {
  group: DocGroup
  path: string
  top: boolean
  expanded: (id: string, contains: boolean, top: boolean) => boolean
  onToggle: (id: string, open: boolean) => void
  onNavigate: () => void
}) {
  const contains = groupContains(group, path)
  const open = expanded(group.id, contains, top)
  return (
    <div className={top ? "mt-3" : "mt-2"}>
      <button
        type="button"
        aria-expanded={open}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm font-medium hover:bg-sidebar-accent"
        onClick={() => onToggle(group.id, open)}
      >
        <span className={cn("text-xs text-muted-foreground transition-transform", open && "rotate-90")}>▶</span>
        {group.title}
      </button>
      {open ? (
        <div className="mt-0.5 ml-3 border-l pl-2">
          {group.pages.map((item) => (
            <a
              key={item.path}
              href={href(item.path)}
              aria-current={path === item.path ? "page" : undefined}
              className={cn(
                "block rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
                path === item.path && "bg-sidebar-accent font-medium text-foreground",
              )}
              onClick={onNavigate}
            >
              {item.title}
            </a>
          ))}
          {group.sections?.map((section) => (
            <NavGroup
              key={section.id}
              group={section}
              path={path}
              top={false}
              expanded={expanded}
              onToggle={onToggle}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"))

  function toggle() {
    const next = !document.documentElement.classList.contains("dark")
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
    setDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="hover:bg-sidebar-accent w-full rounded-md px-2 py-1.5 text-left text-sm"
    >
      {dark ? "Tema claro" : "Tema escuro"}
    </button>
  )
}
