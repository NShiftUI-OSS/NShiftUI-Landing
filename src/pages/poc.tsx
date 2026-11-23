import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Article, CodeBlock, DownloadLink, Ext, K, P } from "@/components/doc"
import { repos } from "@/lib/links"

export function PocRepoPage() {
  return (
    <Article kicker="POC" title="O repositório">
      <P>
        O POC é <Ext href={repos.demo}>NShiftUI-Demo</Ext>. A tag publicada é <K>v1.0.0</K>. O comando <K>rainbow demo</K>, no CLI instalado pelo tap atual, baixa essa tag para <K>~/Library/Application Support/rainbow/demo</K> no macOS, e para <K>~/.rainbow/demo</K> nos outros sistemas. <K>RAINBOW_DEMO_DIR</K> troca o destino. <K>rainbow demo --force</K> baixa de novo. A demonstração não faz parte de <K>brew install rainbow</K>.
      </P>
      <div className="flex flex-wrap gap-3">
        <DownloadLink href={repos.demoArchive}>Arquivo da tag v1.0.0</DownloadLink>
        <DownloadLink href={repos.demo}>Repositório</DownloadLink>
      </div>
      <P>
        As bibliotecas nativas não estão no demo. O app de iOS depende da tag publicada de NShiftUI-iOS. O app de Android baixa o AAR publicado de NShiftUI-Android. No primeiro startup com banco vazio, a API carrega as oito telas do seed. As alterações publicadas no CMS persistem no Postgres.
      </P>
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ["web", "Editor do CMS. React, Vite, Tailwind, TanStack Router."],
          ["back", "API e Postgres. Sobe com Docker."],
          ["ios", "App. Abre ios/NShiftUI-POC-iOS.xcodeproj."],
          ["android", "App. Abre a pasta android no Android Studio."],
        ].map(([folder, role]) => (
          <Card key={folder}>
            <CardHeader>
              <CardTitle className="font-mono text-base">{folder}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{role}</CardContent>
          </Card>
        ))}
      </div>
      <P>Licença do demo: MIT. Copyright (c) 2026 NShiftUI-OSS.</P>
    </Article>
  )
}

export function PocRunPage() {
  return (
    <Article kicker="POC" title="Executar">
      <P>
        Requisitos do README: Node.js e Docker para o editor e a API, Xcode para o app de iOS, Android Studio para o app de Android. O editor e a API usam HTTPS local. O certificado é gerado uma vez, a partir de <K>back</K>.
      </P>
      <CodeBlock
        title="obter a tag"
        code={`git clone --branch v1.0.0 --depth 1 https://github.com/NShiftUI-OSS/NShiftUI-Demo.git
cd NShiftUI-Demo`}
      />
      <CodeBlock
        title="certificado"
        code={`cd back
npm install
npm run setup:local-https`}
      />
      <CodeBlock
        title="API"
        code={`cd back
docker compose up --build`}
      />
      <P>A API fica em <K>https://127.0.0.1:3000</K>.</P>
      <CodeBlock
        title="editor"
        code={`cd web
npm install
npm run dev`}
      />
      <P>O editor fica em <K>https://localhost:5173</K>. O desenho da tela é o texto Rainbow que vem da API. O telefone do editor é um canvas React. Ele não é a renderização nativa dos apps.</P>
      <CodeBlock
        title="apps"
        code={`# Xcode
open ios/NShiftUI-POC-iOS.xcodeproj

# Android Studio
# File → Open → pasta android`}
      />
      <P>
        Com o CLI instalado pelo tap atual, <K>rainbow demo</K> baixa o mesmo arquivo <Ext href={repos.demoArchive}>v1.0.0.tar.gz</Ext> e copia as pastas <K>web</K>, <K>back</K>, <K>ios</K> e <K>android</K>.
      </P>
    </Article>
  )
}
