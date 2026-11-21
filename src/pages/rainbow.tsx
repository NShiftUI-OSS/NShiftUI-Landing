import { Article, CodeBlock, DocTable, Ext, H2, K, P, Ul } from "@/components/doc"
import { repos } from "@/lib/links"

const grammar = `Document      = UseDeclaration* Node*
UseDeclaration = "use" Identifier "@" Version
               | "use" Placeholder
Node          = NodeName Arguments? Children? Modifier*
NodeName      = Identifier | Placeholder
Arguments     = "(" ParameterList? ")"
ParameterList = Parameter ("," Parameter)*
Parameter     = Identifier ":" Value
Children      = "{" Node* "}"
Modifier      = "." "id" "(" String ")"
              | "." "style" Arguments
              | "." "events" "{" Trigger* "}"
              | "." "slots" "{" Slot* "}"
Trigger       = NodeName "{" Event* "}"
Event         = NodeName Arguments? IdModifier?
Slot          = NodeName "{" Node* "}"
IdModifier    = "." "id" "(" String ")"
Value         = String | Number | Bool | EnumIdentifier | Placeholder | TaggedValue | Array | Object | Null
TaggedValue   = "@" EmbeddedLanguage "(" EmbeddedBody ")"
EmbeddedLanguage = "JSON" | "YAML" | "XML" | "HTML" | "MARKDOWN"
EmbeddedBody  = Placeholder | RawEmbeddedText
Array         = "[" (Value ("," Value)* ","?)? "]"
Object        = "(" (ObjectEntry ("," ObjectEntry)*)? ")"
ObjectEntry   = ObjectKey ":" Value
ObjectKey     = Identifier | String`

export function RainbowInstallPage() {
  return (
    <Article kicker="Rainbow" title="Instalação">
      <P>
        <Ext href={repos.rust}>RainbowParser-Rust</Ext> é a autoridade da gramática e a API global de backend. Versão publicada: <K>0.1.0-beta.1</K> (<K>rainbow_parser::RAINBOW_PARSER_VERSION</K>). Requisitos do README: Rust 1.86 ou mais novo, e Cargo. Node 20 ou mais novo só entra para compilar a extensão de editor a partir do fonte.
      </P>
      <CodeBlock
        title="clone da tag publicada"
        code={`git clone --branch v0.1.0-beta.1 --depth 1 https://github.com/NShiftUI-OSS/RainbowParser-Rust.git
cd RainbowParser-Rust
cargo run -p rainbow-cli -- --version`}
      />
      <P>O arquivo da tag também está em <Ext href={repos.rustSource}>v0.1.0-beta.1.tar.gz</Ext>. A <Ext href={repos.rustRelease}>release</Ext> anexa os dois pacotes WASM. Não anexa o binário <K>rainbow</K>.</P>
      <H2>Workspace</H2>
      <DocTable
        headers={["Crate", "Uso"]}
        rows={[
          ["rainbow-parser", "lexer, parser, AST, diagnósticos, formatter, JSON"],
          ["rainbow-cli", "binário rainbow"],
          ["rainbow-lsp", "language server"],
          ["rainbow-wasm", "os mesmos envelopes JSON, para Node e React"],
          ["editors/vscode-rainbow", "cliente da extensão"],
          ["spec/grammar.md", "gramática"],
          ["fixtures/", "exemplos válidos e inválidos"],
        ]}
      />
      <P>Spec, schema e paridade ficam em <K>spec/grammar.md</K>, <K>spec/ast.schema.json</K>, <K>fixtures/</K> e <K>docs/PARITY.md</K>. O contrato WASM está em <K>docs/WASM.md</K>.</P>
      <CodeBlock
        title="comandos do README, a partir da raiz do clone"
        code={`cargo run -p rainbow-cli -- parse --json fixtures/valid/home.rbw
cargo run -p rainbow-cli -- format fixtures/valid/home.rbw
cargo run -p rainbow-cli -- validate --json fixtures/valid/home.rbw
cargo run -p rainbow-cli -- expand --map fixtures/templates/example.map.json fixtures/templates/example.rbw
cargo run -p rainbow-cli -- validate-registry fixtures/registry/valid.registry.json
cargo run -p rainbow-cli -- doctor
cargo run -p rainbow-cli -- demo`}
      />
      <P>Cada comando está detalhado na seção CLI. A gramática começa na página seguinte.</P>
    </Article>
  )
}

export function RainbowGrammarPage() {
  return (
    <Article kicker="Rainbow" title="Gramática">
      <P>
        {"() configura. {} compõe filhos e fluxo. Um objeto Rainbow também usa parênteses: (chave: valor). Chaves soltas não são objeto nem JSON. A semântica de Screen, Button ou OnTap pertence ao runtime, não ao parser."}
      </P>
      <CodeBlock title="spec/grammar.md" code={grammar} />
      <P>
        {"Um documento é zero ou mais use e depois nós. use no topo é um pin. Dentro de um bloco, use volta a ser um identificador. O pin concreto é use Nome@Versão. use sem versão é erro de parse. use é opcional: a camada semântica resolve o nome sem pin para a última versão registrada."}
      </P>
      <P>Modificadores do nó: <K>.id("…")</K>, <K>.style(…)</K>, <K>.events {"{ … }"}</K> e <K>.slots {"{ … }"}</K>. Um trigger guarda events. Um slot guarda nós. <K>.id</K> também marca um event.</P>
      <CodeBlock
        title="fixtures/valid/with-use.formatted.rbw"
        code={`use Screen@1.0.0
use Button@2.1.0

Screen(name: "Home") {
  Button(
    title: "Entrar",
    variant: .primary
  )
  .events {
    OnTap {
      Navigate(to: "Dashboard")
    }
  }
}`}
      />
      <CodeBlock
        title="fixtures/valid/home.formatted.rbw"
        code={`Screen(name: "Home") {
  Button(
    title: "Entrar",
    variant: .primary
  )
  .events {
    OnTap {
      Navigate(to: "Dashboard")
    }
  }
}`}
      />
    </Article>
  )
}

export function RainbowLexiconPage() {
  return (
    <Article kicker="Rainbow" title="Léxico e valores">
      <CodeBlock
        title="tokens"
        code={`IdentifierStart        = "_" | "A"..."Z" | "a"..."z"
IdentifierContinuation = IdentifierStart | "0"..."9"
Identifier             = IdentifierStart IdentifierContinuation*
Placeholder            = "#{" Identifier "}"
EnumIdentifier         = "." Identifier
String                 = '"' character* '"'
Int                    = "-"? digit+
Double                 = "-"? digit+ "." digit+
Version                = digit+ "." digit+ "." digit+ ("." digit+)*
Bool                   = "true" | "false"
Null                   = "null"
Whitespace             = " " | "\\n" | "\\r\\n" | "\\r" | "\\t"`}
      />
      <Ul>
        <li><K>1.25</K> é <K>Double</K>. <K>1.0.0</K> é <K>Version</K>, porque tem dois ou mais pontos.</li>
        <li>Valor enum leva ponto na fonte, <K>.primary</K>. A AST guarda o nome sem o ponto. <K>primary</K> solto não é valor.</li>
        <li>{"Comentário de linha é // até o fim da linha. # sozinho não comenta: # abre #{Nome}."}</li>
        <li>{"Escapes de string: \\\" \\\\ \\n \\r \\t \\0."}</li>
        <li>Vírgula depois do último parâmetro, ou do último campo de objeto, é erro de parse. Array aceita vírgula final.</li>
      </Ul>
      <CodeBlock
        title="valores"
        code={`Node(
  text: "value",
  int: -1,
  double: 1.25,
  enabled: true,
  disabled: false,
  variant: .primary,
  items: ["a", 1, null],
  meta: (
    id: "home",
    "dash-key": false
  ),
  emptyArray: [],
  emptyObject: ()
)`}
      />
    </Article>
  )
}

export function RainbowNamesPage() {
  return (
    <Article kicker="Rainbow" title="Nomes e construtores">
      <P>
        Plugin, event, trigger e o nome concreto de um <K>use</K> são UpperCamelCase, só letras ASCII: <K>Screen</K>, <K>OnTap</K>, <K>SendHTTPRequest</K>. Parâmetro, valor enum (<K>.name</K>) e chave de placeholder ficam fora dessa regra.
      </P>
      <P>O tipo não vai na AST. Ele sai da posição.</P>
      <DocTable
        headers={["Posição", "Tipo"]}
        rows={[
          ["Raiz, ou filho do corpo de um plugin", "plugin"],
          ["Filho de um trigger On*, e o filho não é On*", "event"],
          ["OnTap, OnSuccess, …", "trigger"],
        ]}
      />
      <P>
        Plugin e event compartilham um namespace. <K>rainbow validate</K> e o LSP recusam o mesmo nome nas duas posições (<K>rainbow.semantic.nameKindConflict</K>) e recusam nome fora de UpperCamelCase. O registry JSON opcional tem as chaves <K>plugins</K> e <K>events</K>: <K>rainbow validate-registry</K>.
      </P>
      <P>
        No iOS, <K>NShiftRegisteredVersionCatalog</K> encerra com <K>fatalError</K> no registro duplo. No Android, o mesmo catálogo lança <K>NShiftRegisteredVersionCatalogFailure</K>.
      </P>
      <H2>Construtores</H2>
      <Ul>
        <li>Plugin ou event concreto sem bloco de filhos é construtor. A lista existe mesmo vazia: <K>Spinner()</K> e <K>Navigate()</K>. Sem os parênteses, o diagnóstico é <K>rainbow.semantic.missingConstructor</K>.</li>
        <li>{"Plugin com filhos e sem parâmetros omite (): VerticalStack { Text() }. VerticalStack() { Text() } é rainbow.parser.emptyConstructorBlock."}</li>
        <li>{"Com parâmetros, () permanece e { fica na mesma linha do ). Sem parâmetros, { fica na mesma linha do nome."}</li>
        <li>{"Event não tem bloco de filhos, então continua exigindo (). Trigger On* não é construtor: OnTap { Navigate() }."}</li>
        <li>{"Um trigger precisa de pelo menos um filho. OnTap { } e um OnTap solto são rainbow.semantic.emptyTrigger. Bloco vazio de plugin continua legal."}</li>
        <li>{"#{Nome} pula a checagem de construtor até o expand. Se o mapa só traz o nome, o template escreve a chamada: #{Plugin}() com valor PromoBanner vira PromoBanner()."}</li>
      </Ul>
      <P>{"decode e format ainda aceitam texto que falha nessas checagens semânticas, para o printer poder emitir Nome(). As checagens rodam em validate e no LSP. Os parsers móveis continuam só de sintaxe."}</P>
    </Article>
  )
}

export function RainbowPlaceholdersPage() {
  return (
    <Article kicker="Rainbow" title="Placeholders">
      <P>
        {"#{Nome} é só do backend. iOS e Android leem Rainbow concreto. A substituição é rainbow expand --map vars.json. validate --concrete e expand --validate recusam furo sobrando. A mesma chave substitui todas as ocorrências."}
      </P>
      <CodeBlock
        title="furos"
        code={`use #{Name}
#{Plugin}()
@JSON(#{blob})`}
      />
      <Ul>
        <li>{"use #{Nome}: o valor do mapa é Nome@MAJOR.MINOR.PATCH, por exemplo PromoBanner@1.0.0, e o resultado é use PromoBanner@1.0.0."}</li>
        <li>{"use Nome@1.0.0 é o pin concreto. use Nome sem versão é erro de parse. Não misture use #{Nome}@1.0.0."}</li>
        <li>{"Um pin de linha inteira #{UsePin} vira use Screen@1.0.0 quando o mapa contém essa linha."}</li>
        <li>{"@JSON(#{Nome}) é o furo do blob inteiro. Interpolação parcial, como @JSON({\"a\": #{x}}), é erro de lexer."}</li>
      </Ul>
      <P>Valores do mapa são fragmentos Rainbow inseridos como texto. Uma string inclui as aspas.</P>
      <CodeBlock
        title="expand"
        code={`cargo run -p rainbow-cli -- expand --map fixtures/templates/example.map.json fixtures/templates/example.rbw
cargo run -p rainbow-cli -- expand --map vars.json --validate template.rbw`}
      />
      <CodeBlock
        title="mapa, como no pacote Node"
        code={`rainbow.expand(
  "Button(title: #{Title})",
  JSON.stringify({ Title: '"Entrar"' }),
  true,
)`}
      />
    </Article>
  )
}

export function RainbowLangPage() {
  return (
    <Article kicker="Rainbow" title="Valores @LANG">
      <P>
        {"@LANG(…) só aparece como valor de parâmetro. A allowlist, sem alias, é JSON, YAML, XML, HTML e MARKDOWN. O payload é texto cru dentro dos parênteses, não uma string Rainbow."}
      </P>
      <CodeBlock
        code={`Screen(payload: @JSON({
  "title": "Entrar"
}))`}
      />
      <Ul>
        <li>{"@ de use Nome@1.0.0 continua sendo o token do pin. @LANG( é reconhecido quando o identificador é seguido de (."}</li>
        <li>{"JSON usa @JSON({\"a\":1}). O objeto nativo é (a: 1)."}</li>
        <li>A validação do corpo fica no <K>validate</K> e no LSP. Corpo inválido mantém o texto original no format.</li>
        <li>O pedido LSP <K>rainbow/embeddedRegions</K> lista esses corpos para os language services da extensão.</li>
      </Ul>
    </Article>
  )
}

export function RainbowFormatPage() {
  return (
    <Article kicker="Rainbow" title="Formato canônico">
      <P>
        O printer não preserva o espaçamento original. Comentários <K>//</K> imediatamente acima de <K>use</K>, nó ou parâmetro são mantidos, no mesmo recuo. <K>rainbow format arquivo.rbw</K> imprime o canônico. <K>--check</K> sai 0 se o arquivo já está formatado e 1 se mudaria.
      </P>
      <Ul>
        <li>{"use sai antes dos nós, um por linha. Pins consecutivos ficam juntos. Uma linha em branco separa o último use do primeiro nó."}</li>
        <li>Irmãos ganham uma linha em branco entre eles. Recuo de dois espaços por nível.</li>
        <li>{"Um parâmetro escalar fica na linha, salvo quando o valor quebra. Dois ou mais parâmetros, ou qualquer valor que quebra, colocam cada parâmetro na própria linha, sem vírgula final."}</li>
        <li>Objeto com dois ou mais campos sempre quebra. O <K>)</K> alinha com a linha que abriu o objeto. Objeto com zero ou um campo fica compacto quando o valor é de uma linha.</li>
        <li>Trigger <K>On*</K> fica compacto quando todo valor é de uma linha. Bloco sempre abre as chaves em linhas novas. Arrays ficam inline.</li>
        <li>Corpo <K>@LANG</K> multilinha é reindentado na impressão, e o lexer remove esse recuo ao reler.</li>
      </Ul>
      <CodeBlock
        title="fixtures/valid/objects.formatted.rbw"
        code={`Screen(
  navigationBar: (
    title: "Feedback",
    theme: "amber",
    leading: "back"
  ),
  scroll: (
    enabled: true,
    fastRefresh: true
  )
) {
  VerticalStack(
    style: (
      alignment: .leading,
      spacing: 12
    )
  ) {
    Progress(value: 0.66)

    Spinner()

    Separator()
  }
}`}
      />
    </Article>
  )
}

export function RainbowParityPage() {
  return (
    <Article kicker="Rainbow" title="Paridade">
      <P>
        A gramática concreta vai para <Ext href={repos.parserIos}>RainbowParser-iOS</Ext> <K>0.2.0-beta.1</K> e <Ext href={repos.parserAndroid}>RainbowParser-Android</Ext> <K>0.1.0-beta.1</K>. Estes ficam só no crate Rust: placeholders, <K>expand --map</K>, <K>validate --concrete</K> para furos restantes, <K>validate-registry</K>, envelopes JSON do CLI, LSP e WASM.
      </P>
      <P>
        O concreto compartilhado: nós, parâmetros e blocos; string, int, double, bool, null, enum <K>.nome</K>, array, objeto e <K>@LANG</K> com corpo real; <K>use Nome@1.2.3</K>; comentários <K>//</K>; o token <K>@</K>; o lexema de versão; e o printer canônico. O <K>Int</K> de 64 bits do iOS vira <K>Long</K> no Kotlin.
      </P>
      <P>Como espelhar uma mudança de sintaxe, na ordem do <K>docs/PARITY.md</K>:</P>
      <Ul>
        <li>Atualizar <K>spec/grammar.md</K> e <K>spec/ast.schema.json</K>.</li>
        <li>Ajustar <K>fixtures/valid</K> e <K>fixtures/invalid</K>.</li>
        <li>Implementar em <K>crates/rainbow-parser</K>.</li>
        <li><K>cargo test --workspace</K> e <K>cargo build -p rainbow-lsp</K>.</li>
        <li>Espelhar só o concreto no iOS e no Android.</li>
      </Ul>
    </Article>
  )
}

export function RainbowWasmPage() {
  return (
    <Article kicker="Rainbow" title="WASM">
      <P>
        <K>crates/rainbow-wasm</K> devolve os mesmos envelopes de <K>rainbow &lt;comando&gt; --json</K>. Falha é <K>{'"ok": false'}</K> dentro do JSON. A chamada não lança. O <K>expand</K> roda no Node, antes de enviar o payload ao celular. O editor React chama <K>init()</K> uma vez e depois usa <K>parse</K>, <K>format</K> e <K>validate</K> de forma síncrona.
      </P>
      <DocTable
        headers={["Export", "Equivalente"]}
        rows={[
          ["version()", "rainbow --version"],
          ["parse(source)", "rainbow parse --json"],
          ["format(source)", "rainbow format --json"],
          ["validate(source, concrete)", "rainbow validate --json"],
          ["expand(source, mapJson, validate)", "rainbow expand --map … --json"],
          ["validateRegistry(source)", "rainbow validate-registry --json"],
        ]}
      />
      <P>A release <K>v0.1.0-beta.1</K> publica os dois pacotes no mesmo job. Se um build falha, a release não sai.</P>
      <Ul>
        <li>
          <Ext href={repos.wasmNode}>rainbow-parser-wasm-node.tgz</Ext>
          {": CommonJS. Carrega o .wasm sozinho, sem init()."}
        </li>
        <li>
          <Ext href={repos.wasmWeb}>rainbow-parser-wasm-web.tgz</Ext>
          {": módulo ES com init(), para Vite e React."}
        </li>
      </Ul>
      <CodeBlock
        title="Node"
        code={`const rainbow = require("rainbow-parser-wasm-node");

const parsed = JSON.parse(rainbow.parse('Button(title: "Entrar")'));
if (!parsed.ok) {
  // parsed.diagnostics
}`}
      />
      <CodeBlock
        title="instalação dos assets publicados"
        code={`npm install ${repos.wasmNode}
npm install ${repos.wasmWeb}`}
      />
      <P>
        De um ES module, crie um <K>require</K> com <K>createRequire(import.meta.url)</K>. O job de release monta os pacotes com Rust 1.88 ou mais novo, o target <K>wasm32-unknown-unknown</K>, <K>wasm-pack</K> 0.15 e Node 20. Para reproduzir: <K>VERSION=0.1.0-beta.1 bash scripts/ci/release/assemble.sh</K>.
      </P>
    </Article>
  )
}

export function RainbowApiPage() {
  return (
    <Article kicker="Rainbow" title="API Rust">
      <CodeBlock
        title="decode / encode"
        code={`use rainbow_parser::{decode, encode};

let document = decode(r#"Button(title: "Entrar")"#)?;
let formatted = encode(&document);`}
      />
      <P>
        Parse com sucesso devolve <K>{'"ok": true'}</K>, <K>document</K> (<K>uses</K> e <K>nodes</K>) e <K>diagnostics</K>. Erro de sintaxe sai com código 2 e <K>{'"ok": false'}</K>, <K>document</K> nulo. O binário lê stdin quando o caminho é <K>-</K>.
      </P>
      <CodeBlock
        title="stdin"
        code={`echo 'Button(title: "Entrar")' | cargo run -p rainbow-cli -- parse --json -`}
      />
      <P>
        Um processo que já tem o binário no <K>PATH</K> chama <K>rainbow parse --json screen.rbw</K>. O README documenta esse contrato para evitar <K>cgo</K> enquanto a gramática evolui. A extensão em desenvolvimento está em <K>editors/vscode-rainbow</K>: <K>cargo build -p rainbow-lsp</K>, depois <K>npm install</K>, <K>npm run compile</K> e, se quiser o pacote, <K>npm run package</K>.
      </P>
    </Article>
  )
}
