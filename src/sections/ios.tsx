import { CodeBlock, Ext, H3, K, P } from "@/components/doc"
import { repos } from "@/lib/links"

export function IosSection() {
  return (
    <section id="ios" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">03 — Runtime</p>
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">iOS</h2>
        <P>
          <Ext href={repos.ios}>NShiftUI-iOS</Ext> é um runtime SwiftUI de plugins e events, com DI e macros. O host registra serviços, views de plugin e events, e desenha árvores de <K>NShiftPluginModel</K> com <K>NShiftView(model:)</K>. É um runtime, e o product SPM se chama <K>NShiftUI</K>.
        </P>
        <P>
          A release <Ext href={repos.iosRelease}>v0.2.0-beta.3</Ext> não anexa binário. <K>NShiftUIVersion.current</K> nessa tag é <K>0.2.0-beta.3</K>. O consumidor resolve a tag git. O README publicado na raiz ainda é o modelo do GitLab; o contrato do pacote está em <K>Package.swift</K>.
        </P>
        <P>
          Plataformas do pacote: iOS 15 e macOS 14. Tools <K>6.3</K>, <K>swiftLanguageModes: [.v6]</K>. O único product é a library <K>NShiftUI</K>. <K>import NShiftUI</K> reexporta Domain, DI e as macros. <K>NShiftUIDomain</K>, <K>NShiftUIDI</K> e <K>NShiftUIMacros</K> são targets, não products.
        </P>
        <CodeBlock
          title="Package.swift do app"
          code={`dependencies: [
    .package(
        url: "https://github.com/NShiftUI-OSS/NShiftUI-iOS.git",
        exact: "0.2.0-beta.3"
    ),
]

// no target:
.product(name: "NShiftUI", package: "NShiftUI")`}
        />
        <P>
          O requisito <K>exact: "0.2.0-beta.3"</K> resolve a tag <K>v0.2.0-beta.3</K>. Dentro do pacote, a tag fixa <Ext href={repos.parserIosRelease}>RainbowParser-iOS 0.2.0-beta.1</Ext> (<K>exact</K>) e o product <K>RainbowParser</K>, mais <K>swift-syntax</K> <K>from: "603.0.0-latest"</K>. <K>NShiftRainbowCompiler</K> transforma o documento Rainbow em <K>NShiftPluginModel</K>.
        </P>
        <H3>Arranque</H3>
        <CodeBlock
          title="host"
          code={`NShiftConfig.shared.startup(
    hostContainer: container,
    assemblies: [HomeAssembly(), CheckoutAssembly()]
)
NShiftView(model: root)`}
        />
        <P>
          <K>startup</K> roda a assembly do core e as assemblies do host. A segunda chamada falha por precondition. <K>NShiftView</K> exige um container registrado em <K>NShiftPluginContainerCatalog</K>. A raiz é um <K>NShiftPluginContainer</K>. <K>registerPlugin</K> grava o nome quando o tipo é container.
        </P>
        <P>
          O autor escreve <K>var body</K> e chama <K>children()</K> e <K>slots(key)</K>. O campo do modelo é <K>children</K>. A identidade de servidor é <K>id: String?</K>, opcional. A identidade de render é o <K>renderId</K> posicional (<K>r</K>, <K>r/c/…</K>). Os dois não se misturam. Mutações públicas do engine: <K>replaceMetadata</K>, <K>replacePlugin</K>, <K>replaceChildren</K>, <K>replaceSlots</K>, <K>replaceSlot</K>, <K>replaceEvents</K>, <K>replaceEvent</K>.
        </P>
        <H3>Macros exportadas</H3>
        <CodeBlock
          code={`@NShiftPlugin(name:version:metadata:slots:)
@NShiftEvent(name:version:metadata:slots:)
@NShiftMetadata()
@NShiftTokenMetadata()
@NShiftSlotKey()
@NShiftPluginAssemble(_ plugins:)
@NShiftEventAssemble(_ events:)`}
        />
        <P>
          São sete macros, via <K>import NShiftUI</K>. <K>@NShiftPlugin</K> e <K>@NShiftEvent</K> são member macros de struct, com SemVer obrigatório. <K>@NShiftMetadata</K> é de struct. <K>@NShiftTokenMetadata</K> é de enum com <K>RawValue</K> <K>String</K>. <K>@NShiftSlotKey</K> é de enum que também é <K>NShiftSlotKey</K>. O init canônico é gerado; o autor não declara init. ViewModel chega por <K>resolver.resolve</K>. Falha de metadata ou de ViewModel devolve <K>nil</K>: o plugin não desenha, e o event não executa (<K>initializationFailed</K>).
        </P>
        <P>
          A superfície de v0.2.0-beta.3 deixa de fora <K>@NShiftMainPluginRegister</K>, packs, <K>pluginRegister()</K>, <K>NShiftRendering</K>, <K>NShiftAnyRendering</K>, <K>NShiftEmptyRenderer</K> e <K>NShiftSlotContent</K>.
        </P>
        <P>
          Do package root, o guia do repositório usa <K>swift build</K> e <K>swift test</K>.
        </P>
      </div>
    </section>
  )
}
