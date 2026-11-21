import type { ReferenceEntry } from "@/docs/reference"

export const iosMacros: ReferenceEntry[] = [
  {
    path: "/ios/macros/plugin",
    title: "@NShiftPlugin",
    kicker: "Macro iOS",
    lead: "Member macro e extension macro para uma struct que já é NShiftPlugin. Ela grava o nome e a versão, guarda metadata, estilo, filhos, slots e events, e gera o init que o store chama.",
    attribute: `@NShiftPlugin(
    name: NShiftPluginName,
    version: NShiftVersion,
    metadata: (any NShiftMetadata.Type)? = nil,
    slots: (any NShiftSlotKey.Type)? = nil
)`,
    exampleTitle: "O que o autor escreve",
    example: `@NShiftPlugin(name: "PrimaryButton", version: "1.0.0", metadata: PrimaryButtonMetadata.self)
struct PrimaryButton: NShiftPlugin {
    var body: some View {
        EmptyView()
    }
}`,
    generates: `static let name: NShiftPluginName = "PrimaryButton"
static let version: NShiftVersion = "1.0.0"
static let metadataType: any NShiftMetadata.Type = PrimaryButtonMetadata.self
private let metadata: PrimaryButtonMetadata
private let style: NShiftPluginStyle
private let pluginChildren: [NShiftPluginModel]
private let slots: [NShiftSlotName: [NShiftPluginModel]]
private let events: [AnyNShiftPluginEvent]
private let resolver: any NShiftDependencyResolver
private let eventHandler: any NShiftEventHandler
private let engine: (any NShiftEngine)?
private let renderID: NShiftRenderID
let viewModel: (any NShiftPluginViewModel)?
func children() -> some View
init?(model:resolver:eventHandler:engine:renderID:)`,
    notes: [
      "A struct não declara o init. O macro gera o init canônico.",
      "A extensão conforma NShiftPluginWithMetadata, NShiftPluginWithViewModel e NShiftRainbowRegistrant, e adiciona registerNShiftRainbow.",
      "children() e slots(key) leem a árvore pelo NShiftChildrenAccessor e pelo NShiftSlotsAccessor.",
      "Falha de metadata ou de ViewModel faz o init devolver nil. O node desenha vazio.",
    ],
    connects: "O nome UpperCamelCase é o mesmo nó Rainbow. NShiftRainbowCompiler monta um NShiftPluginModel. O store chama make, que chama esse init. Os filhos do bloco {} viram pluginChildren. .events vira events. .style vira NShiftPluginStyle.",
  },
  {
    path: "/ios/macros/event",
    title: "@NShiftEvent",
    kicker: "Macro iOS",
    lead: "Member macro para uma struct de event. O event não tem filhos de plugin: ele executa uma ação quando um trigger On* dispara.",
    attribute: `@NShiftEvent(
    name: NShiftEventName,
    version: NShiftVersion,
    metadata: (any NShiftMetadata.Type)? = nil,
    slots: (any NShiftSlotKey.Type)? = nil
)`,
    example: `@NShiftEvent(name: "Navigate", version: "1.0.0")
struct Navigate: NShiftEvent {
    func execute() async throws {}
}`,
    generates: `static let name: NShiftEventName
static let version: NShiftVersion
static let metadataType
metadata, slots, slotsStorage, slotModels, events
viewModel, eventHandler, resolver, engine
init?(model:resolver:)`,
    notes: [
      "O protocolo NShiftEvent pede init?(model:resolver:viewModel:) e execute() async throws.",
      "A extensão conforma NShiftEventWithMetadata e NShiftRainbowRegistrant.",
      "SemVer é obrigatório no atributo. O init falho não executa o event: o handler devolve initializationFailed.",
    ],
    connects: "No Rainbow, o event é filho de um trigger On*. O compilador cria um NShiftEventModel com trigger, metadata e slots. O registerEvent da assembly instancia a struct a partir desse modelo.",
  },
  {
    path: "/ios/macros/metadata",
    title: "@NShiftMetadata",
    kicker: "Macro iOS",
    lead: "Extension macro para struct que já declara NShiftMetadata. Sintetiza Hashable e Sendable. Não gera armazenamento.",
    attribute: "@NShiftMetadata()",
    example: `@NShiftMetadata()
struct PrimaryButtonMetadata: NShiftMetadata {
    var title: String
}`,
    generates: "extension PrimaryButtonMetadata: Hashable, Sendable {}",
    notes: [
      "Só struct. O diagnóstico NShiftMetadata.requiresStruct recusa class e enum.",
      "A struct tem de escrever : NShiftMetadata. Senão o diagnóstico é requiresProtocolConformance.",
      "Não declare Hashable nem Sendable na lista de herança. O macro já sintetiza os dois e o diagnóstico é redundantHashableOrSendable.",
    ],
    connects: "O tipo entra em @NShiftPlugin(metadata:) ou @NShiftEvent(metadata:). NShiftRainbowCompiler decodifica os parâmetros Rainbow para essa struct e guarda o valor em AnyNShiftMetadata.",
  },
  {
    path: "/ios/macros/token-metadata",
    title: "@NShiftTokenMetadata",
    kicker: "Macro iOS",
    lead: "Extension macro para enum sem valor associado que já conforma NShiftTokenMetadata. Gera RawValue String, init(rawValue:), rawValue e allCases.",
    attribute: "@NShiftTokenMetadata()",
    example: `@NShiftTokenMetadata()
enum ButtonVariant: NShiftTokenMetadata {
    case primary
    case quiet
}`,
    generates: `extension ButtonVariant: Hashable, Sendable, CaseIterable, RawRepresentable {
    public typealias RawValue = String
    public var rawValue: String { switch self { case .primary: return "primary" ... } }
    public init?(rawValue: String)
    public static var allCases: [ButtonVariant] { [.primary, .quiet] }
}`,
    notes: [
      "Só enum, com pelo menos um case, sem associated value.",
      "Não declare String, CaseIterable, RawRepresentable, Hashable nem Sendable na herança.",
      "O raw value de cada case é o nome do case.",
    ],
    connects: "Um parâmetro Rainbow .primary casa com o raw value \"primary\". O decoder de metadata usa esse raw value quando o campo é um token.",
  },
  {
    path: "/ios/macros/slot-key",
    title: "@NShiftSlotKey",
    kicker: "Macro iOS",
    lead: "Extension macro para enum que já conforma NShiftSlotKey. Gera CaseIterable e RawRepresentable com RawValue String. O raw value é o nome do case e é o nome do slot no Rainbow.",
    attribute: "@NShiftSlotKey()",
    example: `@NShiftSlotKey()
enum CardSlot: NShiftSlotKey {
    case header
    case footer
}`,
    generates: `extension CardSlot: CaseIterable, RawRepresentable {
    public typealias RawValue = String
    public var rawValue: String
    public init?(rawValue: String)
    public static var allCases: [CardSlot]
}`,
    notes: [
      "Só enum, pelo menos um case, sem associated value.",
      "Não declare String, CaseIterable nem RawRepresentable na herança.",
      "Passe o metatipo em @NShiftPlugin(slots:) ou @NShiftEvent(slots:).",
    ],
    connects: "No Rainbow, .slots { Header { ... } Footer { ... } } usa esses nomes. O compilador separa esses nós do children e os coloca em NShiftSlotMap / no dicionário slots do modelo.",
  },
  {
    path: "/ios/macros/plugin-assemble",
    title: "@NShiftPluginAssemble",
    kicker: "Macro iOS",
    lead: "Body macro na função assemblePlugins de um tipo que conforma NShiftDependencyAssembly. Cada argumento vira um container.registerPlugin.",
    attribute: "@NShiftPluginAssemble(_ plugins: Any.Type...)",
    example: `struct HomeAssembly: NShiftDependencyAssembly {
    @NShiftPluginAssemble(PrimaryButton.self, ScreenRoot.self)
    func assemblePlugins(container: any NShiftDependencyRegistering) {}
}`,
    generates: `container.registerPlugin(PrimaryButton.self, container: container) { model, container, renderID, viewModel in
    PrimaryButton.make(
        model: model,
        viewModel: viewModel,
        resolver: container,
        eventHandler: container.resolveUnwrapping(NShiftEventHandler.self),
        engine: NShiftRenderingEngine.current ?? container.resolve(NShiftEngine.self),
        renderID: renderID
    )
}`,
    notes: [
      "A função tem de se chamar assemblePlugins. Outro nome é requiresAssemblePluginsFunction.",
      "O tipo envolvente tem de conformar NShiftDependencyAssembly.",
      "A lista de tipos não pode ficar vazia. Cada argumento tem de ser um tipo, no formato Nome.self.",
      "O corpo que o autor escreveu em assemblePlugins é preservado depois dos registerPlugin.",
    ],
    connects: "NShiftConfig.shared.startup chama assemblePlugins de cada assembly. Sem esse registro, NShiftPluginStore não devolve a view e NShiftView não encontra o container da raiz.",
  },
  {
    path: "/ios/macros/event-assemble",
    title: "@NShiftEventAssemble",
    kicker: "Macro iOS",
    lead: "Body macro na função assembleEvents. Cada argumento vira container.registerEvent, que constrói o event a partir do NShiftEventModel.",
    attribute: "@NShiftEventAssemble(_ events: Any.Type...)",
    example: `struct HomeAssembly: NShiftDependencyAssembly {
    @NShiftEventAssemble(Navigate.self)
    func assembleEvents(container: any NShiftDependencyRegistering) {}
}`,
    generates: `container.registerEvent(Navigate.self, container: container) { eventModel, viewModel in
    Navigate(
        model: eventModel,
        resolver: container,
        viewModel: viewModel
    )
}`,
    notes: [
      "A função tem de se chamar assembleEvents e viver num NShiftDependencyAssembly.",
      "A lista de tipos não pode ficar vazia.",
      "O init gerado por @NShiftEvent recebe o modelo. Se ele devolve nil, o handler marca initializationFailed e execute() não roda.",
    ],
    connects: "O trigger On* do Rainbow escolhe quais NShiftEventModel o NShiftEventHandler executa. O registro liga o nome do event ao tipo Swift.",
  },
]
