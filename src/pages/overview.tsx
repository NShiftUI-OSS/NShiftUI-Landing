import { Article, DocTable, Ext, K, P } from "@/components/doc"
import { href } from "@/docs/use-route"
import { repos } from "@/lib/links"

export function OverviewPage() {
  return (
    <Article kicker="NShiftUI" title="Visão geral">
      <P>
        O NShiftUI descreve telas nativas em Rainbow e desenha essas telas no iOS e no Android. O editor e a API trabalham com o template. <K>RainbowParser-Rust</K> expande os furos. Os runtimes recebem Rainbow concreto.
      </P>
      <P>{"template .rbw → expand (RainbowParser-Rust) → Rainbow concreto → NShiftUI no iOS e no Android"}</P>
      <P>
        A ordem de trabalho é a da sidebar: instalar cada peça, depois usar o que ela expõe. Os arquivos-fonte Rainbow usam a extensão <K>.rbw</K>. O language id do editor é <K>rainbow</K>.
      </P>
      <H>Repositórios</H>
      <DocTable
        headers={["Repositório", "O que o desenvolvedor usa", "Versão publicada"]}
        rows={[
          ["RainbowParser-Rust", "gramática, expand, CLI, LSP, WASM", "0.1.0-beta.1"],
          ["RainbowParser-iOS", "parser concreto Swift", "0.2.0-beta.1"],
          ["RainbowParser-Android", "parser concreto Kotlin, AAR", "0.1.0-beta.1"],
          ["NShiftUI-iOS", "runtime SwiftUI", "0.2.0-beta.3"],
          ["NShiftUI-Android", "runtime Android, AAR e KSP", "0.2.0-beta.3"],
          ["NShiftUI-Demo", "editor, API, apps de iOS e Android", "tag 0.1.0"],
          ["homebrew-rainbowparser", "fórmula do CLI", "aponta para o GitLab"],
        ]}
      />
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <Ext href={repos.rust}>RainbowParser-Rust</Ext>
          {" — "}
          <a className="underline underline-offset-4" href={href("/rainbow/instalacao")}>instalação</a>
        </li>
        <li>
          <Ext href={repos.parserIos}>RainbowParser-iOS</Ext>
          {" e "}
          <Ext href={repos.ios}>NShiftUI-iOS</Ext>
          {" — "}
          <a className="underline underline-offset-4" href={href("/ios/instalacao")}>instalação</a>
        </li>
        <li>
          <Ext href={repos.parserAndroid}>RainbowParser-Android</Ext>
          {" e "}
          <Ext href={repos.android}>NShiftUI-Android</Ext>
          {" — "}
          <a className="underline underline-offset-4" href={href("/android/instalacao")}>instalação</a>
        </li>
        <li>
          <Ext href={repos.demo}>NShiftUI-Demo</Ext>
          {" — "}
          <a className="underline underline-offset-4" href={href("/poc/executar")}>como executar</a>
        </li>
        <li>
          CLI <K>rainbow</K>
          {" — "}
          <a className="underline underline-offset-4" href={href("/cli/instalacao")}>instalação</a>
        </li>
      </ul>
      <P>
        O README de RainbowParser-iOS na tag <K>v0.2.0-beta.1</K> ainda imprime <K>0.1.0-beta.1</K>. A constante no código dessa tag é <K>RainbowParserVersion.current = "0.2.0-beta.1"</K>. O README de NShiftUI-Android na branch <K>main</K> ainda imprime <K>0.2.0-beta.1</K>. A tag <K>v0.2.0-beta.3</K> define <K>NShiftUIVersion.current = "0.2.0-beta.3"</K>. O README de NShiftUI-iOS no GitHub ainda é o modelo do GitLab. O contrato está em <K>Package.swift</K>.
      </P>
    </Article>
  )
}

function H({ children }: { children: string }) {
  return <h2 className="pt-2 text-xl font-semibold tracking-tight">{children}</h2>
}
