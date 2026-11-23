import { Article, CodeBlock, Ext, H2, K, P, Ul } from "@/components/doc"
import { repos } from "@/lib/links"

export function IosInstallPage() {
  return (
    <Article kicker="iOS" title="Instalação">
      <P>
        <Ext href={repos.ios}>NShiftUI-iOS</Ext> é um pacote Swift. A release <Ext href={repos.iosRelease}>v1.0.0</Ext> não anexa binário. <K>NShiftUIVersion.current</K> nessa tag é <K>1.0.0</K>. O consumidor resolve a tag git.
      </P>
      <P>
        Plataformas: iOS 15 e macOS 14. Tools <K>6.3</K>, <K>swiftLanguageModes: [.v6]</K>. O único product é a library <K>NShiftUI</K>. <K>import NShiftUI</K> reexporta Domain, DI e as macros. <K>NShiftUIDomain</K>, <K>NShiftUIDI</K> e <K>NShiftUIMacros</K> são targets, não products.
      </P>
      <CodeBlock
        title="Package.swift do app"
        code={`dependencies: [
    .package(
        url: "https://github.com/NShiftUI-OSS/NShiftUI-iOS.git",
        exact: "1.0.0"
    ),
]

// no target:
.product(name: "NShiftUI", package: "NShiftUI")`}
      />
      <P>
        O requisito <K>exact: "1.0.0"</K> resolve a tag <K>v1.0.0</K>. Dentro do pacote, a dependência do parser é <Ext href={repos.parserIos}>RainbowParser-iOS</Ext> com <K>exact: "1.0.0"</K> e o product <K>RainbowParser</K>, mais <K>swift-syntax</K> <K>from: "603.0.0-latest"</K>.
      </P>
      <P>Do package root, o guia do repositório usa <K>swift build</K> e <K>swift test</K>.</P>
      <CodeBlock
        code={`git clone --branch v1.0.0 --depth 1 https://github.com/NShiftUI-OSS/NShiftUI-iOS.git
cd NShiftUI-iOS
swift build`}
      />
    </Article>
  )
}

export function IosParserPage() {
  return (
    <Article kicker="iOS" title="Parser">
      <P>
        <Ext href={repos.parserIos}>RainbowParser-iOS</Ext> lê Rainbow concreto e devolve uma AST genérica. A semântica de <K>Screen</K>, <K>Button</K>, <K>OnTap</K> ou <K>SendHTTPRequest</K> pertence ao NShiftUI. {"#{Nome}"} e <K>expand</K> não existem neste pacote.
      </P>
      <P>
        A tag publicada é <Ext href={repos.parserIosRelease}>v1.0.0</Ext>. <K>RainbowParserVersion.current</K> nessa tag é <K>1.0.0</K>.
      </P>
      <P>Requisitos do README: Swift 6.3 ou mais novo, toolchain do Xcode, Swift Package Manager. <K>swift-tools-version: 6.3</K> e <K>swiftLanguageModes: [.v6]</K>.</P>
      <CodeBlock
        title="Package.swift de quem consome só o parser"
        code={`.package(
    url: "https://github.com/NShiftUI-OSS/RainbowParser-iOS.git",
    exact: "1.0.0"
)
.product(name: "RainbowParser", package: "RainbowParser")`}
      />
      <H2>Como usar</H2>
      <CodeBlock
        code={`import RainbowParser

let parser = RainbowParser()
let document = try parser.decode(source)
let encoded = parser.encode(document)

let document2 = try RainbowDecoder().decode(source)
let encoded2 = RainbowEncoder().encode(document2)`}
      />
      <P>
        <K>decode</K> lança <K>RainbowParseError</K> com <K>diagnostics</K>. O pipeline é lexer, parser, <K>RainbowDocument</K>, printer. {"()"} configura. {"{}"} compõe. O encoder imprime o canônico: não preserva o espaçamento original. Comentários e formatação sem perda ficam fora do beta documentado.
      </P>
      <P>
        Modelos públicos: <K>RainbowDocument</K>, <K>RainbowNode</K>, <K>RainbowBlock</K>, <K>RainbowParameter</K>, <K>RainbowValue</K>, <K>RainbowObjectEntry</K>. São <K>Sendable</K>. Cada decode cria lexer e parser novos.
      </P>
      <CodeBlock code={`swift test`} />
    </Article>
  )
}

export function IosRuntimePage() {
  return (
    <Article kicker="iOS" title="Runtime">
      <P>
        O runtime registra serviços, views de plugin e events, e desenha árvores de <K>NShiftPluginModel</K> com <K>NShiftView(model:)</K>. <K>NShiftRainbowCompiler</K> transforma o <K>RainbowDocument</K> no modelo. Não é um product separado do parser: o product SPM é <K>NShiftUI</K>.
      </P>
      <Ul>
        <li>O autor escreve <K>var body</K> e chama <K>children()</K> e <K>slots(key)</K>. O campo do modelo é <K>children</K>.</li>
        <li>A identidade de servidor é <K>id: String?</K>, opcional. A identidade de render é o <K>renderId</K> posicional (<K>r</K>, <K>r/c/…</K>). Os dois não se misturam.</li>
        <li><K>NShiftView</K> exige um container registrado em <K>NShiftPluginContainerCatalog</K>. A raiz é um <K>NShiftPluginContainer</K>.</li>
        <li><K>registerPlugin</K> grava o nome quando o tipo é container.</li>
      </Ul>
      <P>
        Mutações públicas do engine: <K>replaceMetadata</K>, <K>replacePlugin</K>, <K>replaceChildren</K>, <K>replaceSlots</K>, <K>replaceSlot</K>, <K>replaceEvents</K>, <K>replaceEvent</K>.
      </P>
      <P>
        A superfície de v1.0.0 deixa de fora <K>@NShiftMainPluginRegister</K>, packs, <K>pluginRegister()</K>, <K>NShiftRendering</K>, <K>NShiftAnyRendering</K>, <K>NShiftEmptyRenderer</K> e <K>NShiftSlotContent</K>.
      </P>
    </Article>
  )
}

export function IosMacrosPage() {
  return (
    <Article kicker="iOS" title="Macros e arranque">
      <P>Sete macros, via <K>import NShiftUI</K>.</P>
      <CodeBlock
        code={`@NShiftPlugin(name:version:metadata:slots:)
@NShiftEvent(name:version:metadata:slots:)
@NShiftMetadata()
@NShiftTokenMetadata()
@NShiftSlotKey()
@NShiftPluginAssemble(_ plugins:)
@NShiftEventAssemble(_ events:)`}
      />
      <Ul>
        <li><K>@NShiftPlugin</K> e <K>@NShiftEvent</K> são member macros de struct, com SemVer obrigatório.</li>
        <li><K>@NShiftMetadata</K> é de struct. <K>@NShiftTokenMetadata</K> é de enum com <K>RawValue</K> <K>String</K>. <K>@NShiftSlotKey</K> é de enum que também é <K>NShiftSlotKey</K>.</li>
        <li>O init canônico é gerado. O autor não declara init.</li>
        <li>ViewModel chega por <K>resolver.resolve</K>. Falha de metadata ou de ViewModel devolve <K>nil</K>: o plugin não desenha, e o event não executa (<K>initializationFailed</K>).</li>
      </Ul>
      <H2>Arranque do host</H2>
      <CodeBlock
        code={`NShiftConfig.shared.startup(
    hostContainer: container,
    assemblies: [HomeAssembly(), CheckoutAssembly()]
)
NShiftView(model: root)`}
      />
      <P>
        <K>startup</K> roda a assembly do core e as assemblies do host. A segunda chamada falha por precondition. <K>HomeAssembly</K> e <K>CheckoutAssembly</K> são o exemplo de host da arquitetura do pacote: o app declara as próprias assemblies.
      </P>
      <P>
        A ordem interna é Domain, DI, macros, product <K>NShiftUI</K>. <K>NShiftConfig.shared.startup(hostContainer:assemblies:)</K> é o ponto de entrada do processo. Depois disso, <K>NShiftView(model:)</K> resolve o engine e pede a view ao <K>NShiftPluginStore</K>.
      </P>
    </Article>
  )
}
