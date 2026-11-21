import { CodeBlock, DocTable, Ext, H3, K, P } from "@/components/doc"
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

const lexical = `IdentifierStart        = "_" | "A"..."Z" | "a"..."z"
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
At                     = "@"
Whitespace             = " " | "\\n" | "\\r\\n" | "\\r" | "\\t"`

export function RainbowSection() {
  return (
    <section id="rainbow" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl px-5 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">01 — DSL</p>
        <h2 className="mt-2 max-w-3xl font-serif text-4xl tracking-tight sm:text-5xl">Rainbow</h2>
        <div className="mt-6 max-w-3xl space-y-4">
          <P>
            Rainbow é a DSL textual dos payloads de SDUI nativo. A forma lembra uma chamada com parâmetros e um bloco de filhos. A sintaxe é genérica: o significado de <K>Screen</K>, <K>Button</K> ou <K>OnTap</K> pertence ao runtime NShiftUI.
          </P>
          <P>
            A autoridade da gramática e a API global de backend estão em <Ext href={repos.rust}>RainbowParser-Rust</Ext>, versão <K>0.1.0-beta.1</K> (<K>rainbow_parser::RAINBOW_PARSER_VERSION</K>). Arquivos-fonte usam a extensão <K>.rbw</K>. O language id do editor continua <K>rainbow</K>.
          </P>
          <P>
            {"O caminho do payload é template .rbw, depois expand neste crate, depois Rainbow concreto, depois iOS ou Android. Os parsers móveis leem só o concreto. Furos #{Name} e o comando expand ficam no backend."}
          </P>
        </div>

        <nav aria-label="Nesta seção" className="mt-8 flex flex-wrap gap-2 text-sm">
          {[
            ["#gramatica", "Gramática"],
            ["#lexico", "Léxico"],
            ["#nomes", "Nomes"],
            ["#construtores", "Construtores"],
            ["#placeholders", "Placeholders"],
            ["#embedded", "@LANG"],
            ["#formato", "Formato"],
            ["#paridade", "Paridade"],
            ["#wasm", "WASM"],
            ["#api-rust", "API Rust"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full bg-secondary px-3 py-1 hover:bg-accent">
              {label}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-12">
          <div className="space-y-4">
            <H3 id="gramatica">Gramática</H3>
            <P>
              {"() configura. {} compõe filhos e fluxo. Um objeto Rainbow também usa parênteses, (chave: valor). Chaves soltas não são objeto nem JSON."}
            </P>
            <CodeBlock title="spec/grammar.md" code={grammar} />
            <P>
              {"Um documento é zero ou mais use e depois nós. use no topo é um pin. Dentro de um bloco, use volta a ser um identificador comum. O pin concreto é use Nome@Versão. use sem versão é erro de parse."}
            </P>
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
            <P>
              Modificadores do nó: <K>.id("…")</K>, <K>.style(…)</K>, <K>.events {"{ … }"}</K> e <K>.slots {"{ … }"}</K>. Um trigger guarda events. Um slot guarda nós. <K>.id</K> também pode marcar um event.
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="lexico">Léxico</H3>
            <CodeBlock title="tokens" code={lexical} />
            <P>
              <K>1.25</K> é <K>Double</K>. <K>1.0.0</K> é <K>Version</K>, porque tem dois ou mais pontos. Um valor enum leva ponto na fonte, <K>.primary</K>, e a AST guarda o nome sem o ponto. Um identificador solto, <K>primary</K>, não é valor.
            </P>
            <P>
              {"Comentário de linha é // até o fim da linha. # sozinho não comenta: # abre um placeholder #{Nome}. Escapes de string: \\\" \\\\ \\n \\r \\t \\0."}
            </P>
            <P>
              <K>use</K> é opcional. A camada semântica resolve um nome sem pin para a última versão registrada.
            </P>
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
          </div>

          <div className="space-y-4">
            <H3 id="nomes">Nomes de plugin, event e trigger</H3>
            <P>
              Plugin, event, trigger e o nome concreto de um <K>use</K> são UpperCamelCase, só letras ASCII: <K>Screen</K>, <K>OnTap</K>, <K>SendHTTPRequest</K>. Nomes de parâmetro, valores enum (<K>.name</K>) e chaves de placeholder ficam fora dessa regra.
            </P>
            <P>
              O tipo não vai na AST. Ele sai da posição no documento.
            </P>
            <DocTable
              headers={["Posição", "Tipo"]}
              rows={[
                ["Raiz, ou filho do corpo de um plugin", "plugin"],
                ["Filho de um trigger On*, e o filho não é On*", "event"],
                ["OnTap, OnSuccess, …", "trigger"],
              ]}
            />
            <P>
              Plugin e event compartilham um namespace. <K>rainbow validate</K> e o LSP recusam o mesmo nome nas duas posições, com <K>rainbow.semantic.nameKindConflict</K>. Também recusam nome fora de UpperCamelCase. Um registry JSON opcional, com as chaves <K>plugins</K> e <K>events</K>, cobre backends sem árvore de documento: <K>rainbow validate-registry</K>.
            </P>
            <P>
              No iOS, <K>NShiftRegisteredVersionCatalog</K> encerra com <K>fatalError</K> no registro duplo. No Android, o mesmo catálogo lança <K>NShiftRegisteredVersionCatalogFailure</K> quando o nome já está do outro lado.
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="construtores">Construtores e triggers</H3>
            <P>
              Plugin ou event concreto sem bloco de filhos é construtor. A lista de argumentos existe mesmo vazia: <K>Spinner()</K> e <K>Navigate()</K>. Sem os parênteses, o diagnóstico é <K>rainbow.semantic.missingConstructor</K>.
            </P>
            <P>
              {"Plugin com filhos e sem parâmetros omite (): VerticalStack { Text() } é válido. VerticalStack() { Text() } é rainbow.parser.emptyConstructorBlock. Com parâmetros, () permanece e { fica na mesma linha do ). Sem parâmetros, { fica na mesma linha do nome."}
            </P>
            <P>
              Event não tem bloco de filhos, então continua exigindo <K>()</K>. Trigger <K>On*</K> não é construtor: <K>{"OnTap { Navigate() }"}</K>.
            </P>
            <P>
              {"Um trigger existe para guardar ações. Precisa de pelo menos um filho. OnTap { } e um OnTap solto são rainbow.semantic.emptyTrigger. Bloco vazio de plugin continua legal: Empty { }."}
            </P>
            <P>
              {"#{Nome} pula a checagem de construtor até o expand. Se o mapa só traz o nome, o template escreve a chamada: #{Plugin}() com valor PromoBanner vira PromoBanner(). Se a substituição já é a chamada inteira, ela entra no lugar do furo e traz os próprios parênteses."}
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="placeholders">Placeholders, só no backend</H3>
            <P>
              {"#{Nome} aparece em use, no nome do nó e em valores. A mesma chave substitui todas as ocorrências. O comando é rainbow expand --map vars.json. validate --concrete e expand --validate recusam furo sobrando."}
            </P>
            <CodeBlock
              title="pins de template"
              code={`use #{Name}
#{Plugin}()
@JSON(#{blob})`}
            />
            <ul className="list-disc space-y-2 pl-5 text-[16.5px] leading-7">
              <li>{"use #{Nome}: o valor do mapa é Nome@MAJOR.MINOR.PATCH, por exemplo PromoBanner@1.0.0, e o resultado é use PromoBanner@1.0.0."}</li>
              <li>{"use Nome@1.0.0 é o pin concreto. use Nome sem versão é erro de parse."}</li>
              <li>{"Não misture use #{Nome}@1.0.0."}</li>
              <li>{"Um pin de linha inteira #{UsePin} vira use Screen@1.0.0 quando o mapa contém essa linha."}</li>
              <li>{"@JSON(#{Nome}) é o furo do blob inteiro. O expand coloca o valor do mapa dentro de @JSON(…).\nInterpolação parcial, como @JSON({\"a\": #{x}}), é erro de lexer."}</li>
            </ul>
            <P>
              Valores do mapa são fragmentos Rainbow inseridos como texto. Uma string inclui as aspas. No pacote Node, o mapa <K>{`{ "Title": "\\"Entrar\\"" }`}</K> preenche <K>{"Button(title: #{Title})"}</K>.
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="embedded">Valores @LANG</H3>
            <P>
              {"@LANG(…) só aparece como valor de parâmetro. As linguagens da allowlist, sem alias, são JSON, YAML, XML, HTML e MARKDOWN. O payload é texto cru dentro dos parênteses, não uma string Rainbow."}
            </P>
            <CodeBlock
              code={`Screen(payload: @JSON({
  "title": "Entrar"
}))`}
            />
            <P>
              {"@ de use Nome@1.0.0 continua sendo o token do pin. @LANG( é reconhecido quando o identificador é seguido de (. JSON usa @JSON({\"a\":1}). O objeto nativo é (a: 1). Vírgula sobrando depois do último campo de objeto, ou do último parâmetro, é erro de parse. Arrays aceitam vírgula final."}
            </P>
            <P>
              A validação do corpo fica na toolchain Rust, no <K>validate</K> e no LSP. Corpo inválido mantém o texto original no format. O pedido LSP <K>rainbow/embeddedRegions</K> lista esses corpos para os language services empacotados na extensão do editor.
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="formato">Formato canônico</H3>
            <P>
              O printer não preserva o espaçamento original. Comentários <K>//</K> imediatamente acima de <K>use</K>, nó ou parâmetro são mantidos, no mesmo recuo.
            </P>
            <ul className="list-disc space-y-2 pl-5 text-[16.5px] leading-7">
              <li>{"use sai antes dos nós, um por linha: use Screen@1.0.0. Pins consecutivos ficam juntos. Uma linha em branco separa o último use do primeiro nó raiz."}</li>
              <li>Irmãos, na raiz e dentro de bloco, ganham uma linha em branco entre eles.</li>
              <li>Recuo de dois espaços por nível.</li>
              <li>{"Um parâmetro escalar fica na linha: Button(title: \"Entrar\") e Progress(value: 0.66), salvo quando o valor quebra."}</li>
              <li>{"Dois ou mais parâmetros, ou qualquer valor que quebra, colocam cada parâmetro na própria linha, sem vírgula final."}</li>
              <li>Objeto com dois ou mais campos sempre quebra. O <K>)</K> alinha com a linha que abriu o objeto. Objeto com zero ou um campo fica compacto quando o valor é de uma linha: <K>{"(id: \"home\")"}</K> e <K>()</K>.</li>
              <li>Trigger <K>On*</K> fica compacto quando todo valor é de uma linha.</li>
              <li>{"Bloco sempre abre as chaves em linhas novas, inclusive o vazio. Arrays ficam inline. Objetos usam (…). Chave de objeto imprime como identificador quando pode, senão como string."}</li>
              <li>Corpo <K>@LANG</K> multilinha é reindentado na impressão, e o lexer remove esse recuo ao reler.</li>
            </ul>
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
          </div>

          <div className="space-y-4">
            <H3 id="paridade">O que iOS e Android espelham</H3>
            <P>
              A gramática concreta viaja para <Ext href={repos.parserIos}>RainbowParser-iOS</Ext> e <Ext href={repos.parserAndroid}>RainbowParser-Android</Ext>. Estes ficam só no crate Rust: placeholders, <K>expand --map</K>, <K>validate --concrete</K> para furos restantes, <K>validate-registry</K>, envelopes JSON do CLI, LSP e WASM.
            </P>
            <P>
              O concreto compartilhado: nós, parâmetros e blocos; string, int, double, bool, null, enum <K>.nome</K>, array, objeto e <K>@LANG</K> com corpo real; <K>use Nome@1.2.3</K>; comentários <K>//</K>; o token <K>@</K>; o lexema de versão; e o printer canônico. O <K>Int</K> de 64 bits do iOS vira <K>Long</K> no Kotlin. Os parsers móveis continuam só de sintaxe: não carregam o registry de nomes do NShiftUI.
            </P>
            <P>
              {"No Rust, decode e format ainda aceitam texto que falha nas checagens semânticas de construtor, para o printer poder emitir Nome(). Essas checagens rodam em validate e no LSP."}
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="wasm">WASM, Node e React</H3>
            <P>
              <K>crates/rainbow-wasm</K> devolve os mesmos envelopes JSON de <K>rainbow &lt;comando&gt; --json</K>. Falha de sintaxe ou semântica é <K>{'"ok": false'}</K> dentro do JSON. A chamada não lança.
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
            <P>
              A release <K>v0.1.0-beta.1</K> publica os dois pacotes no mesmo job. Se um build falha, a release não sai.
            </P>
            <ul className="list-disc space-y-2 pl-5 text-[16.5px] leading-7">
              <li>
                <Ext href={repos.wasmNode}>rainbow-parser-wasm-node.tgz</Ext>
                {": CommonJS para o backend. Carrega o .wasm sozinho, sem init()."}
              </li>
              <li>
                <Ext href={repos.wasmWeb}>rainbow-parser-wasm-web.tgz</Ext>
                {": módulo ES com init(), para Vite e React."}
              </li>
            </ul>
            <CodeBlock
              title="Node"
              code={`const rainbow = require("rainbow-parser-wasm-node");

const parsed = JSON.parse(rainbow.parse('Button(title: "Entrar")'));
if (!parsed.ok) {
  // parsed.diagnostics
}

const expanded = JSON.parse(
  rainbow.expand(
    "Button(title: #{Title})",
    JSON.stringify({ Title: '"Entrar"' }),
    true,
  ),
);
// expanded.expanded é Rainbow concreto`}
            />
            <P>
              De um ES module, crie um <K>require</K> com <K>createRequire(import.meta.url)</K> e carregue <K>rainbow-parser-wasm-node</K>. O <K>expand</K> roda no Node, antes de enviar o payload ao celular. O editor React chama <K>init()</K> uma vez e depois usa <K>parse</K>, <K>format</K> e <K>validate</K> de forma síncrona.
            </P>
            <CodeBlock
              title="instalação dos assets publicados"
              code={`npm install ${repos.wasmNode}
npm install ${repos.wasmWeb}`}
            />
            <P>
              O job de release monta os pacotes com Rust 1.88 ou mais novo, o target <K>wasm32-unknown-unknown</K>, <K>wasm-pack</K> 0.15 e Node 20. O requisito do crate, para parse e CLI no host, é Rust 1.86 ou mais novo.
            </P>
          </div>

          <div className="space-y-4">
            <H3 id="api-rust">API Rust e o workspace</H3>
            <CodeBlock
              title="decode / encode"
              code={`use rainbow_parser::{decode, encode};

let document = decode(r#"Button(title: "Entrar")"#)?;
let formatted = encode(&document);`}
            />
            <CodeBlock
              title="crates/"
              code={`rainbow-parser   lexer, parser, AST, diagnósticos, formatter, JSON
rainbow-cli       binário rainbow
rainbow-lsp       language server
rainbow-wasm      bindings Node e React`}
            />
            <P>
              Parse com sucesso devolve <K>{'"ok": true'}</K>, <K>document</K> e <K>diagnostics</K>. Erro de sintaxe sai com código 2 e <K>{'"ok": false'}</K>, <K>document</K> nulo. A extensão de editor em desenvolvimento está em <K>editors/vscode-rainbow</K>. Os comandos do binário estão na seção CLI.
            </P>
            <P>
              Release publicada: <Ext href={repos.rustRelease}>v0.1.0-beta.1</Ext>.
            </P>
          </div>
        </div>
      </div>
    </section>
  )
}
