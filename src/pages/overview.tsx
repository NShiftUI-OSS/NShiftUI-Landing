import { useTranslation } from "react-i18next"

import { href } from "@/docs/use-route"
import { repos } from "@/lib/links"

const mark = `${import.meta.env.BASE_URL}favicon.svg`
const icon = "4.5rem"
const lockupGap = "1rem"

const source = [
  { text: "Screen", kind: "name" },
  { text: "(name: ", kind: "punct" },
  { text: '"Home"', kind: "string" },
  { text: ") {\n  ", kind: "punct" },
  { text: "Button", kind: "name" },
  { text: "(\n    title: ", kind: "punct" },
  { text: '"Entrar"', kind: "string" },
  { text: ",\n    variant: ", kind: "punct" },
  { text: ".primary", kind: "enum" },
  { text: "\n  )\n}", kind: "punct" },
] as const

export function OverviewPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
      <header>
        <p className="text-[13px] font-medium leading-none tracking-tight text-muted-foreground">NShiftUI</p>
        <div className="mt-4 flex items-center" style={{ gap: lockupGap }}>
          <img src={mark} alt="" width={72} height={72} className="shrink-0" style={{ width: icon, height: icon }} />
          <h1 className="max-w-[14ch] text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
            {t("overview.headline")}
          </h1>
        </div>
        <p
          className="mt-6 max-w-xl text-[17px] leading-7 text-muted-foreground"
          style={{ paddingLeft: `calc(${icon} + ${lockupGap})` }}
        >
          {t("overview.lede")}
        </p>
      </header>

      <figure className="mt-16">
        <figcaption className="sr-only">{t("overview.figureTitle")}</figcaption>
        <div className="grid items-start gap-10 border-y py-8 lg:grid-cols-[minmax(0,1.15fr)_5.5rem_minmax(14rem,0.72fr)] lg:gap-0">
          <div className="lg:pr-10">
            <p className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted-foreground uppercase">
              template .rbw
            </p>
            <pre className="mt-6 overflow-x-auto font-mono text-[15px] leading-8">
              <code>
                {source.map((token, index) => (
                  <span key={index} className={tokenClass(token.kind)}>
                    {token.text}
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className="flex items-center gap-3 lg:flex-col lg:pt-9">
            <span className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted-foreground uppercase">
              expand
            </span>
            <span className="h-px w-10 bg-foreground/35 lg:h-16 lg:w-px" />
          </div>
          <div className="lg:pl-8">
            <p className="font-mono text-[11px] leading-none tracking-[0.16em] text-muted-foreground uppercase">
              {t("overview.nativeLabel")}
            </p>
            <div className="mt-6 space-y-6">
              <div>
                <p className="text-3xl font-semibold leading-none tracking-tight">iOS</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("overview.concrete")}</p>
              </div>
              <div>
                <p className="text-3xl font-semibold leading-none tracking-tight">Android</p>
                <p className="mt-2 text-sm text-muted-foreground">{t("overview.concrete")}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">{t("overview.caption")}</p>
      </figure>

      <section className="mt-16" aria-label={t("overview.ways")}>
        <h2 className="text-[13px] font-medium leading-none text-muted-foreground">{t("overview.ways")}</h2>
        <a href={href("/rainbow/instalacao")} className="mt-5 flex items-end justify-between gap-8 border-t py-6">
          <span className="text-4xl font-semibold tracking-tight">Rainbow</span>
          <span className="max-w-xs text-right text-sm leading-6 text-muted-foreground">{t("overview.rainbow")}</span>
        </a>
        <div className="grid border-t sm:grid-cols-2">
          <a href={href("/android/instalacao")} className="border-b py-6 sm:border-r sm:border-b-0 sm:pr-8">
            <span className="block text-3xl font-semibold tracking-tight">Android</span>
            <span className="mt-2 block max-w-xs text-sm leading-6 text-muted-foreground">{t("overview.android")}</span>
          </a>
          <a href={href("/ios/instalacao")} className="py-6 sm:pl-8">
            <span className="block text-3xl font-semibold tracking-tight">iOS</span>
            <span className="mt-2 block max-w-xs text-sm leading-6 text-muted-foreground">{t("overview.ios")}</span>
          </a>
        </div>
        <div className="grid border-t border-b sm:grid-cols-2">
          <a href={href("/poc/executar")} className="border-b py-5 sm:border-r sm:border-b-0 sm:pr-8">
            <span className="block text-xl font-semibold tracking-tight">POC</span>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">{t("overview.poc")}</span>
          </a>
          <a href={href("/cli/instalacao")} className="py-5 sm:pl-8">
            <span className="block text-xl font-semibold tracking-tight">CLI</span>
            <span className="mt-1 block text-sm leading-6 text-muted-foreground">{t("overview.cli")}</span>
          </a>
        </div>
      </section>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <li>
          <a className="underline-offset-4 hover:underline" href={repos.rust} rel="noreferrer" target="_blank">
            RainbowParser-Rust
            <span className="text-muted-foreground"> 0.1.0-beta.1</span>
          </a>
        </li>
        <li>
          <a className="underline-offset-4 hover:underline" href={repos.ios} rel="noreferrer" target="_blank">
            NShiftUI-iOS
            <span className="text-muted-foreground"> v0.2.0-beta.3</span>
          </a>
        </li>
        <li>
          <a className="underline-offset-4 hover:underline" href={repos.android} rel="noreferrer" target="_blank">
            NShiftUI-Android
            <span className="text-muted-foreground"> v0.2.0-beta.3</span>
          </a>
        </li>
      </ul>
    </div>
  )
}

function tokenClass(kind: (typeof source)[number]["kind"]) {
  if (kind === "name") return "text-[#D0A8FF]"
  if (kind === "string") return "text-[#FF9A3C]"
  if (kind === "enum") return "text-[#67E8F9]"
  return "text-[#9CA3AF]"
}
