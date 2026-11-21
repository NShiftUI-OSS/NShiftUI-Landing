import { CodeBlock, DocTable, DownloadLink, Ext, H3, K, P } from "@/components/doc"
import { repos } from "@/lib/links"

export function CliSection() {
  return (
    <section id="cli" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">05 — Ferramenta</p>
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Baixar o CLI</h2>
        <P>
          O binário se chama <K>rainbow</K>. Ele é o crate <K>rainbow-cli</K> dentro de <Ext href={repos.rust}>RainbowParser-Rust</Ext>, versão <K>0.1.0-beta.1</K>. A <Ext href={repos.rustRelease}>release v0.1.0-beta.1</Ext> anexa <K>rainbow-parser-wasm-node.tgz</K> e <K>rainbow-parser-wasm-web.tgz</K>. Não anexa um binário do CLI. O download do CLI é o código-fonte dessa tag.
        </P>
        <div className="flex flex-wrap gap-3">
          <DownloadLink href={repos.rustSource}>Código-fonte v0.1.0-beta.1</DownloadLink>
          <DownloadLink href={repos.rust}>Repositório</DownloadLink>
        </div>
        <P>
          Requisitos do README: Rust 1.86 ou mais novo, e Cargo. Node 20 ou mais novo entra só na hora de compilar a extensão de VS Code ou Cursor a partir do fonte. Os exemplos abaixo usam caminhos de <K>fixtures/</K> do próprio repositório.
        </P>
        <CodeBlock
          title="a partir do clone"
          code={`cargo run -p rainbow-cli -- parse --json fixtures/valid/home.rbw
cargo run -p rainbow-cli -- format fixtures/valid/home.rbw
cargo run -p rainbow-cli -- validate --json fixtures/valid/home.rbw
cargo run -p rainbow-cli -- expand --map fixtures/templates/example.map.json fixtures/templates/example.rbw
cargo run -p rainbow-cli -- validate-registry fixtures/registry/valid.registry.json
cargo run -p rainbow-cli -- install --list
cargo run -p rainbow-cli -- doctor
cargo run -p rainbow-cli -- demo`}
        />
        <H3>Comandos</H3>
        <DocTable
          headers={["Comando", "Função"]}
          rows={[
            ["parse [--json] [arquivo|-]", "AST JSON"],
            ["format [--json] [--check] [arquivo|-]", "Rainbow canônico"],
            ["validate [--json] [--concrete] [arquivo|-]", "sintaxe e nomes"],
            ["validate-registry [--json] [arquivo|-]", "registry plugins/events"],
            ["expand --map arquivo.json [--json] [--validate] [arquivo|-]", "substitui #{Nome}"],
            ["install [cursor|vscode|both]", "extensão do editor"],
            ["doctor", "CLI, LSP, editores"],
            ["demo [--force]", "baixa o POC, tag 0.1.0"],
            ["--version", "0.1.0-beta.1"],
          ]}
        />
        <P>
          {"validate aceita template com #{Nome}, salvo com --concrete. --validate no expand roda a validação concreta depois da substituição. Erro de sintaxe no parse sai com código 2. Em TTY a saída humana usa cores; NO_COLOR e FORCE_COLOR são respeitados. - no lugar do arquivo lê stdin."}
        </P>
        <CodeBlock
          title="contrato JSON"
          code={`{
  "ok": true,
  "document": { "uses": [], "nodes": [] },
  "diagnostics": []
}`}
        />
        <P>
          Um processo Go chama o binário já instalado. O README documenta este caminho enquanto a gramática evolui, sem <K>cgo</K>.
        </P>
        <CodeBlock
          title="Go"
          code={`cmd := exec.Command("rainbow", "parse", "--json", "screen.rbw")
out, err := cmd.Output()`}
        />
        <H3>Editor e Homebrew</H3>
        <P>
          <K>rainbow install cursor</K>, <K>vscode</K> ou <K>both</K> instala o VSIX e pode gravar <K>rainbow.lsp.path</K> e o formatador <K>[rainbow]</K>. <K>--no-settings</K> pula essa gravação. A release no GitHub não inclui o <K>.vsix</K>. O README descreve um fallback com <K>GITLAB_TOKEN</K> quando o VSIX não está em <K>share/rainbow</K>.
        </P>
        <P>
          O tap <Ext href={repos.homebrew}>homebrew-rainbowparser</Ext> está no GitHub. A fórmula <K>Formula/rainbow.rb</K> ainda clona <K>https://gitlab.com/tcc-nshiftui/global/rainbowparser-rust.git</K>, branch <K>release/0.1.0-beta.1</K>, e instala <K>rainbow</K> e <K>rainbow-lsp</K> com Cargo a partir de <K>crates/rainbow-cli</K> e <K>crates/rainbow-lsp</K>. O caminho público para obter o CLI é o repositório RainbowParser-Rust.
        </P>
      </div>
    </section>
  )
}
