import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock, DownloadLink, Ext, P } from "@/components/doc"
import { repos } from "@/lib/links"

export function PocSection() {
  return (
    <section id="poc" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">04 — Demonstração</p>
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Baixar o POC</h2>
        <P>
          O POC é o repositório <Ext href={repos.demo}>NShiftUI-Demo</Ext>. Não há GitHub Release. A tag publicada é <K>0.1.0</K>, e o arquivo dela é o download. O comando <K>rainbow demo</K> baixa essa mesma tag.
        </P>
        <div className="flex flex-wrap gap-3">
          <DownloadLink href={repos.demoArchive}>Arquivo da tag 0.1.0</DownloadLink>
          <DownloadLink href={repos.demo}>Repositório</DownloadLink>
        </div>
        <P>
          O editor, a API e os apps de iOS e Android estão no mesmo repositório. As bibliotecas nativas não estão. O app de iOS depende da tag publicada de NShiftUI-iOS. O app de Android baixa o AAR publicado de NShiftUI-Android. O catálogo começa vazio: as telas nascem no editor e são publicadas na API.
        </P>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["web", "Editor do CMS"],
            ["back", "API e Postgres"],
            ["ios", "App de iOS"],
            ["android", "App de Android"],
          ].map(([folder, role]) => (
            <Card key={folder}>
              <CardHeader>
                <CardTitle className="font-mono text-base">{folder}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{role}</CardContent>
            </Card>
          ))}
        </div>
        <P>
          Requisitos do README: Node.js e Docker para o editor e a API, Xcode para o app de iOS, Android Studio para o app de Android. O editor e a API usam HTTPS local. O certificado é gerado uma vez, a partir de <K>back</K>.
        </P>
        <CodeBlock
          title="certificado, API e editor"
          code={`cd back
npm install
npm run setup:local-https

docker compose up --build
# API em https://127.0.0.1:3000

cd web
npm install
npm run dev
# editor em https://localhost:5173`}
        />
        <P>
          Abra <K>ios/NShiftUI-POC-iOS.xcodeproj</K> no Xcode. Abra a pasta <K>android</K> no Android Studio.
        </P>
        <P>
          Com o CLI instalado, <K>rainbow demo</K> guarda a árvore em <K>~/Library/Application Support/rainbow/demo</K> no macOS, e em <K>~/.rainbow/demo</K> nos outros sistemas. <K>RAINBOW_DEMO_DIR</K> troca o destino. <K>rainbow demo --force</K> baixa de novo. A URL que o comando usa é o arquivo da tag acima. A demonstração não faz parte de <K>brew install rainbow</K>.
        </P>
        <P>Licença do demo: MIT. Copyright (c) 2026 NShiftUI-OSS.</P>
      </div>
    </section>
  )
}

function K({ children }: { children: string }) {
  return (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.86em]">{children}</code>
  )
}
