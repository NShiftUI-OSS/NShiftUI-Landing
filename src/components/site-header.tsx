import { useEffect, useState } from "react"

import { sections } from "@/lib/links"
import { cn } from "cn"

export function SiteHeader() {
  const [active, setActive] = useState<string>("rainbow")

  useEffect(() => {
    const onScroll = () => {
      const marker = 140
      let current: string = sections[0].id
      for (const section of sections) {
        const node = document.getElementById(section.id)
        if (!node) continue
        if (node.getBoundingClientRect().top <= marker) {
          current = section.id
        }
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onScroll)
    }
  }, [])

  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="h-1 bg-[linear-gradient(90deg,#c4552a_0%,#d4a017_28%,#2f6f4e_52%,#2a6f97_76%,#5c4d7a_100%)]" />
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-3">
        <a href="#inicio" className="shrink-0 font-serif text-xl tracking-tight">
          NShiftUI
        </a>
        <nav aria-label="Seções" className="flex flex-1 gap-1 overflow-x-auto">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? "true" : undefined}
              className={cn(
                "rounded-full px-3 py-1 text-sm whitespace-nowrap text-muted-foreground hover:bg-secondary hover:text-foreground",
                active === section.id && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              )}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
