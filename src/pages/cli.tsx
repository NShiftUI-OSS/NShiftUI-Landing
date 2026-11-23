import { Article, CodeBlock, DocTable, DownloadLink, Ext, H2, K, P, Ul } from "@/components/doc"
import { repos } from "@/lib/links"

export function CliInstallPage() {
  return (
    <Article kicker="CLI" title="Instalação">
      <P>
        O binário se chama <K>rainbow</K>. Ele é o crate <K>rainbow-cli</K> em <Ext href={repos.rust}>RainbowParser-Rust</Ext>, versão <K>1.0.0</K>. A <Ext href={repos.rustRelease}>release</Ext> anexa só <K>rainbow-parser-wasm-node.tgz</K> e <K>rainbow-parser-wasm-web.tgz</K>. O download do CLI é o código-fonte da tag.
      </P>
      <div className="flex flex-wrap gap-3">
        <DownloadLink href={repos.rustSource}>Código-fonte v1.0.0</DownloadLink>
        <DownloadLink href={repos.rust}>Repositório</DownloadLink>
      </div>
      <P>Requisitos do README: Rust 1.86 ou mais novo, e Cargo. Os exemplos usam caminhos de <K>fixtures/</K> do próprio repositório.</P>
      <CodeBlock
        code={`git clone --branch v1.0.0 --depth 1 https://github.com/NShiftUI-OSS/RainbowParser-Rust.git
cd RainbowParser-Rust
cargo run -p rainbow-cli -- --version`}
      />
      <P>
        O tap público <Ext href={repos.homebrew}>homebrew-rainbowparser</Ext> instala <K>rainbow</K>, <K>rainbow-lsp</K> e a extensão. Essa distribuição também baixa o Demo <K>v1.0.0</K> pelo comando <K>rainbow demo</K>.
      </P>
      <CodeBlock code={`brew tap NShiftUI-OSS/rainbowparser
brew trust NShiftUI-OSS/rainbowparser
brew install rainbow`} />
    </Article>
  )
}

export function CliCommandsPage() {
  return (
    <Article kicker="CLI" title="Comandos">
      <P>{"rainbow <comando> [opções]. Cores seguem o TTY. NO_COLOR e FORCE_COLOR são respeitados. - no lugar do arquivo lê stdin. Erro de sintaxe no parse sai com código 2."}</P>
      <DocTable
        headers={["Comando", "O que faz"]}
        rows={[
          ["parse [--json] [arquivo|-]", "imprime o AST JSON"],
          ["format [--json] [--check] [arquivo|-]", "imprime o Rainbow canônico"],
          ["validate [--json] [--concrete] [arquivo|-]", "sintaxe e nomes"],
          ["validate-registry [--json] [arquivo|-]", "registry plugins/events"],
          ["expand --map arquivo.json [--json] [--validate] [arquivo|-]", "substitui #{Nome}"],
          ["install [cursor|vscode|both]", "extensão do editor"],
          ["doctor", "confere CLI, LSP e editores"],
          ["demo [--force]", "baixa o POC v1.0.0 com o CLI do tap atual"],
          ["--version, -V", "imprime 1.0.0"],
        ]}
      />
      <H2>parse</H2>
      <P>{"rainbow parse [--json] [arquivo|-]. Sem --json, o sucesso ainda sai em JSON. No erro, sem --json, os diagnósticos vão para o stderr e o processo sai com 2."}</P>
      <CodeBlock code={`cargo run -p rainbow-cli -- parse --json fixtures/valid/home.rbw`} />
      <H2>format</H2>
      <P><K>--check</K> sai 0 se o arquivo já está canônico e 1 se mudaria. <K>--json</K> devolve o envelope em vez do texto.</P>
      <H2>validate</H2>
      <P>
        {"Aceita template com #{Nome}, salvo com --concrete. Recusa nome de plugin, event, trigger ou use fora de UpperCamelCase, e o mesmo nome usado como plugin e como event. A saída humana usa ✓ e ✗."}
      </P>
      <H2>expand</H2>
      <P>
        {"rainbow expand --map <arquivo.json> [--json] [--validate] [arquivo|-]. --map é obrigatório: um objeto JSON de placeholder para fragmento Rainbow. --validate expande e roda a validação concreta. A mesma chave substitui todas as ocorrências."}
      </P>
      <H2>validate-registry</H2>
      <P>{"Lê um JSON com as chaves plugins e events. Falha se o mesmo nome está nas duas listas."}</P>
      <H2>doctor e demo</H2>
      <Ul>
        <li><K>rainbow doctor</K> confere o ambiente do CLI, do LSP e dos editores.</li>
        <li><K>rainbow demo</K> no CLI do tap atual baixa a tag <K>v1.0.0</K> de NShiftUI-Demo. <K>--force</K> baixa de novo.</li>
        <li><K>rainbow install --list</K> lista os editores que o instalador reconhece.</li>
      </Ul>
      <CodeBlock
        title="contrato JSON do parse"
        code={`{
  "ok": true,
  "document": { "uses": [], "nodes": [] },
  "diagnostics": []
}`}
      />
    </Article>
  )
}

export function CliEditorPage() {
  return (
    <Article kicker="CLI" title="Editor">
      <P>
        <K>rainbow install</K> instala o VSIX no Cursor, no VS Code, ou nos dois, e pode gravar <K>rainbow.lsp.path</K> e o formatador <K>[rainbow]</K>. <K>--no-settings</K> pula essa gravação. Depois, no editor: Developer, Reload Window, e abra um <K>.rbw</K>.
      </P>
      <CodeBlock
        code={`rainbow install
rainbow install cursor
rainbow install vscode
rainbow install both
rainbow install --list
rainbow install --no-settings cursor`}
      />
      <P>
        A release <K>v1.0.0</K> no GitHub contém os pacotes WASM. A fórmula Homebrew empacota o VSIX em <K>share/rainbow</K>.
      </P>
      <P>Para desenvolver a extensão a partir do clone:</P>
      <CodeBlock
        code={`cargo build -p rainbow-lsp
cd editors/vscode-rainbow
npm install
npm run compile
npm run package`}
      />
      <P>O language server não reimplementa a gramática. Ele usa <K>rainbow-parser</K>. O pedido <K>rainbow/embeddedRegions</K> lista os corpos <K>@LANG</K> para os language services empacotados na extensão.</P>
    </Article>
  )
}
