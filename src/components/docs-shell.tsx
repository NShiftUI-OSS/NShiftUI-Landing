import { useState } from "react"
import type { ReactNode } from "react"
import { useTranslation } from "react-i18next"

import { groupContains, groups, neighbors, overview, pageByPath, type DocGroup } from "@/docs/nav"
import { href, useRoute } from "@/docs/use-route"
import { languages, type LanguageCode } from "@/i18n"
import { navLabel } from "@/i18n/labels"
import { cn } from "cn"

const mark = `${import.meta.env.BASE_URL}favicon.svg`

export function DocsShell({ children }: { children: ReactNode }) {
  const { t } = useTranslation()
  const path = useRoute()
  const page = pageByPath(path)
  const { previous, next } = neighbors(path)
  const label = (title: string) => navLabel(title, t)
  const [menu, setMenu] = useState(false)
  const [manual, setManual] = useState<Record<string, boolean>>({})

  function expanded(id: string, contains: boolean, top: boolean) {
    if (id in manual) return manual[id]
    if (top) return true
    return contains
  }

  const sidebar = (
    <div className="flex h-full flex-col">
      <a href={href(overview.path)} className="flex h-14 shrink-0 items-center gap-2.5 border-b px-4">
        <img src={mark} alt="" width={32} height={32} className="size-8 shrink-0" />
        <span className="text-[15px] font-semibold leading-none tracking-tight">NShiftUI</span>
      </a>
      <nav aria-label={t("shell.docs")} className="flex-1 overflow-y-auto px-2 py-3">
        <a
          href={href(overview.path)}
          aria-current={path === overview.path ? "page" : undefined}
          className={cn(
            "block rounded-md px-2 py-1.5 text-sm",
            path === overview.path ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent",
          )}
          onClick={() => setMenu(false)}
        >
          {label(overview.title)}
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
            label={label}
          />
        ))}
      </nav>
      <div className="space-y-1 border-t p-2">
        <LanguageControl />
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
            aria-label={t("shell.closeMenu")}
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
            {t("shell.menu")}
          </button>
          <p className="truncate text-sm text-muted-foreground">{page ? label(page.title) : ""}</p>
        </header>
        {children}
        <nav className="mx-auto flex max-w-3xl justify-between gap-4 px-6 pb-12 sm:px-10">
          {previous ? (
            <a href={href(previous.path)} className="text-sm underline-offset-4 hover:underline">
              {label(previous.title)}
            </a>
          ) : (
            <span />
          )}
          {next ? (
            <a href={href(next.path)} className="text-sm underline-offset-4 hover:underline">
              {label(next.title)}
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
  label,
}: {
  group: DocGroup
  path: string
  top: boolean
  expanded: (id: string, contains: boolean, top: boolean) => boolean
  onToggle: (id: string, open: boolean) => void
  onNavigate: () => void
  label: (title: string) => string
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
        {label(group.title)}
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
              {label(item.title)}
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
              label={label}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function LanguageControl() {
  const { t, i18n } = useTranslation()
  const active = (i18n.resolvedLanguage ?? i18n.language).split("-")[0]

  return (
    <div className="px-1 py-1" role="group" aria-label={t("shell.language")}>
      <div className="flex flex-wrap gap-1">
        {languages.map((language) => (
          <button
            key={language.code}
            type="button"
            aria-pressed={active === language.code}
            className={cn(
              "rounded-md px-2 py-1 text-xs",
              active === language.code ? "bg-sidebar-accent font-medium" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
            onClick={() => void i18n.changeLanguage(language.code satisfies LanguageCode)}
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ThemeToggle() {
  const { t } = useTranslation()
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
      {dark ? t("shell.themeLight") : t("shell.themeDark")}
    </button>
  )
}
