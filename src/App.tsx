import { SiteHeader } from "@/components/site-header"
import { repos } from "@/lib/links"
import { AndroidSection } from "@/sections/android"
import { CliSection } from "@/sections/cli"
import { IosSection } from "@/sections/ios"
import { PocSection } from "@/sections/poc"
import { RainbowSection } from "@/sections/rainbow"

export default function App() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section id="inicio" className="mx-auto max-w-5xl px-5 py-16 sm:py-24">
          <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">NShiftUI-OSS</p>
          <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight sm:text-6xl">
            Telas nativas descritas em Rainbow.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-foreground/80">
            O editor e a API trabalham com o template. RainbowParser-Rust expande os furos. Android e iOS desenham o Rainbow concreto com o runtime de plugins e events.
          </p>
          <ol className="mt-10 grid gap-3 sm:grid-cols-5">
            {[
              ["01", "Rainbow", "#rainbow"],
              ["02", "Android", "#android"],
              ["03", "iOS", "#ios"],
              ["04", "POC", "#poc"],
              ["05", "CLI", "#cli"],
            ].map(([index, label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex h-full flex-col justify-between rounded-xl bg-card px-4 py-4 ring-1 ring-foreground/10 hover:bg-accent"
                >
                  <span className="font-mono text-xs text-muted-foreground">{index}</span>
                  <span className="mt-6 font-serif text-2xl">{label}</span>
                </a>
              </li>
            ))}
          </ol>
        </section>
        <RainbowSection />
        <AndroidSection />
        <IosSection />
        <PocSection />
        <CliSection />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-8 text-sm text-muted-foreground">
          <p>MIT. Copyright (c) 2026 NShiftUI-OSS.</p>
          <a className="underline underline-offset-4" href={repos.org} rel="noreferrer" target="_blank">
            github.com/NShiftUI-OSS
          </a>
        </div>
      </footer>
    </div>
  )
}
