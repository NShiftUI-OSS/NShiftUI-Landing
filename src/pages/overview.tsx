import { href } from "@/docs/use-route"
import { repos } from "@/lib/links"

const mark = `${import.meta.env.BASE_URL}favicon.svg`

const steps = [
  {
    href: href("/rainbow/instalacao"),
    index: "01",
    title: "Rainbow",
    text: "Escreva o .rbw, expanda os furos e formate o concreto.",
  },
  {
    href: href("/android/instalacao"),
    index: "02",
    title: "Android",
    text: "Parser, runtime, anotações KSP e cada tipo do domínio.",
  },
  {
    href: href("/ios/instalacao"),
    index: "03",
    title: "iOS",
    text: "Pacote Swift, sete macros e cada tipo do domínio.",
  },
  {
    href: href("/poc/executar"),
    index: "04",
    title: "POC",
    text: "Editor, API e os dois apps, a partir da tag 0.1.0.",
  },
  {
    href: href("/cli/instalacao"),
    index: "05",
    title: "CLI",
    text: "O binário rainbow, do código de RainbowParser-Rust.",
  },
]

export function OverviewPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-8 sm:px-10 sm:py-12">
      <div className="flex items-center gap-4">
        <img src={mark} alt="" className="size-16 rounded-xl" />
        <div>
          <p className="text-sm text-muted-foreground">NShiftUI</p>
          <h1 className="text-4xl font-semibold tracking-tight">Telas nativas, descritas em texto.</h1>
        </div>
      </div>
      <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
        O editor guarda o template. O backend expande. O iOS e o Android desenham o resultado. A sidebar abre cada peça, começando pela instalação.
      </p>

      <figure className="mt-8 overflow-hidden rounded-xl border bg-card">
        <svg viewBox="0 0 760 168" role="img" className="h-auto w-full text-foreground">
          <title>Do template Rainbow até as telas nativas</title>
          <rect x="24" y="36" width="180" height="96" rx="14" fill="currentColor" opacity="0.06" />
          <text x="114" y="78" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="Geist Variable, sans-serif">
            template .rbw
          </text>
          <text x="114" y="102" textAnchor="middle" fill="currentColor" opacity="0.62" fontSize="13" fontFamily="Geist Variable, sans-serif">
            {"#{Nome}"}
          </text>
          <path d="M214 84 H268" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
          <path d="M260 78 L270 84 L260 90" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
          <rect x="278" y="36" width="180" height="96" rx="14" fill="currentColor" opacity="0.06" />
          <text x="368" y="78" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="Geist Variable, sans-serif">
            expand
          </text>
          <text x="368" y="102" textAnchor="middle" fill="currentColor" opacity="0.62" fontSize="13" fontFamily="Geist Variable, sans-serif">
            Rainbow concreto
          </text>
          <path d="M468 84 H522" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
          <path d="M514 78 L524 84 L514 90" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
          <rect x="532" y="24" width="200" height="52" rx="14" fill="currentColor" opacity="0.06" />
          <rect x="532" y="92" width="200" height="52" rx="14" fill="currentColor" opacity="0.06" />
          <text x="632" y="56" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="Geist Variable, sans-serif">
            iOS
          </text>
          <text x="632" y="124" textAnchor="middle" fill="currentColor" fontSize="16" fontFamily="Geist Variable, sans-serif">
            Android
          </text>
        </svg>
        <figcaption className="border-t px-4 py-3 text-sm text-muted-foreground">
          O parser móvel não vê o furo. Ele recebe o concreto e o runtime monta a árvore de plugins.
        </figcaption>
      </figure>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {steps.map((step) => (
          <a key={step.href} href={step.href} className="rounded-xl border bg-card p-4 hover:bg-accent">
            <p className="font-mono text-xs text-muted-foreground">{step.index}</p>
            <p className="mt-3 text-lg font-semibold">{step.title}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <a href={repos.rust} className="rounded-xl border px-4 py-3 text-sm hover:bg-accent" rel="noreferrer" target="_blank">
          RainbowParser-Rust
          <span className="mt-1 block text-muted-foreground">0.1.0-beta.1</span>
        </a>
        <a href={repos.ios} className="rounded-xl border px-4 py-3 text-sm hover:bg-accent" rel="noreferrer" target="_blank">
          NShiftUI-iOS
          <span className="mt-1 block text-muted-foreground">release v0.2.0-beta.3</span>
        </a>
        <a href={repos.android} className="rounded-xl border px-4 py-3 text-sm hover:bg-accent" rel="noreferrer" target="_blank">
          NShiftUI-Android
          <span className="mt-1 block text-muted-foreground">release v0.2.0-beta.3</span>
        </a>
      </div>
    </div>
  )
}
