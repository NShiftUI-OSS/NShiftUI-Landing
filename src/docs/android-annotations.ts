import type { ReferenceEntry } from "@/docs/reference"

export const androidAnnotations: ReferenceEntry[] = [
  {
    path: "/android/anotacoes/plugin",
    title: "@NShiftPlugin",
    kicker: "Anotação Android",
    lead: "Anotação de runtime em classe ou função. O KSP NShiftSymbolProcessor lê com.nshiftui.macro.NShiftPlugin e registra o plugin. Não existe um macro de metadata separado: metadata e slots são parâmetros desta anotação.",
    attribute: `@NShiftPlugin(
    val name: String = "",
    val version: String = "",
    val metadata: KClass<out NShiftMetadata> = NShiftEmptyMetadata::class,
    val container: Boolean = false,
    val slots: KClass<*> = Unit::class,
)`,
    exampleTitle: "Classe ou função @Composable",
    example: `@NShiftPlugin(name = "PrimaryButton", version = "1.0.0", metadata = PrimaryButtonMetadata::class)
class PrimaryButton : NShiftPlugin(name = "PrimaryButton", version = "1.0.0") {
    @Composable
    override fun Content() {}
}

@NShiftPlugin(name = "PrimaryButton", version = "1.0.0")
@Composable
fun PrimaryButton(scope: NShiftPluginScope) {}`,
    generates: `// função @Composable vira a classe PrimaryButton_NShiftPlugin
class PrimaryButton_NShiftPlugin : NShiftPlugin(
    name = "PrimaryButton",
    version = "1.0.0",
    metadata = null,
) {
    @Composable
    override fun Content() {
        PrimaryButton(NShiftPluginScope(this))
    }
}

// installNShiftGenerated
fun NShiftDependencyContainer.installNShiftGenerated() {
    registerPlugin<PrimaryButton>()
    registerPlugin<PrimaryButton_NShiftPlugin>()
}`,
    notes: [
      "Classe anotada tem de herdar NShiftPlugin. Senão o processador registra o erro e não emite o register.",
      "Função anotada exige name e version preenchidos, e também @Composable.",
      "Sem KSP, o autor herda NShiftPlugin ou NShiftEvent e registra à mão. A anotação sozinha não gera o instalador.",
      "container = true marca o plugin como raiz. slots aponta para um enum que implementa NShiftSlotKey.",
    ],
    connects: "NShiftRainbowCatalog.adopt usa o KClass de metadata e o enum de slots no momento do registro. O compilador Rainbow preenche NShiftPluginModel. NShiftView pede a view ao store, que instancia a classe gerada ou a classe anotada.",
  },
  {
    path: "/android/anotacoes/event",
    title: "@NShiftEvent",
    kicker: "Anotação Android",
    lead: "Anotação de runtime em classe que herda NShiftEvent, ou em função suspend. O processador gera o registro e, no caso da função, a classe Nome_NShiftEvent.",
    attribute: `@NShiftEvent(
    val name: String = "",
    val version: String = "",
    val metadata: KClass<out NShiftMetadata> = NShiftEmptyMetadata::class,
    val slots: KClass<*> = Unit::class,
)`,
    example: `@NShiftEvent(name = "Navigate", version = "1.0.0")
class Navigate : NShiftEvent(name = "Navigate", version = "1.0.0") {
    override suspend fun execute() {}
}

@NShiftEvent(name = "Navigate", version = "1.0.0")
suspend fun Navigate(scope: NShiftEventScope) {}`,
    generates: `class Navigate_NShiftEvent : NShiftEvent(
    name = "Navigate",
    version = "1.0.0",
    metadata = null,
) {
    override suspend fun execute() {
        Navigate(NShiftEventScope(this))
    }
}

registerEvent<Navigate>()
registerEvent<Navigate_NShiftEvent>()`,
    notes: [
      "Função sem suspend é erro do processador.",
      "Função sem name ou version é erro.",
      "Classe que não herda NShiftEvent é erro. A alternativa é anotar a função suspend.",
      "metadata padrão NShiftEmptyMetadata é tratado como ausência de decoder.",
    ],
    connects: "O filho de um trigger On* vira NShiftEventModel. registerEvent liga o nome ao tipo. NShiftEventHandler chama execute() no escopo NShiftEventScope.",
  },
  {
    path: "/android/anotacoes/json-tagged",
    title: "@NShiftJSONTagged",
    kicker: "Anotação Android",
    lead: "Não passa pelo KSP. É uma anotação de runtime em classe de metadata. NShiftRainbowCatalog lê os nomes e trata esses parâmetros Rainbow como JSON, em vez de objeto nativo.",
    attribute: `@Target(AnnotationTarget.CLASS)
@Retention(AnnotationRetention.RUNTIME)
annotation class NShiftJSONTagged(val parameters: Array<String>)`,
    example: `@NShiftJSONTagged(parameters = ["payload"])
@Serializable
data class CardMetadata(val title: String, val payload: String) : NShiftMetadata`,
    generates: "Nenhum arquivo é gerado. NShiftRainbowCatalog.SerializableMetadataDecoder consulta metadata.java.getAnnotation(NShiftJSONTagged::class.java) e passa o conjunto de nomes para NShiftRainbowJSON.dictionary.",
    notes: [
      "O catálogo só instala o decoder quando o KClass de metadata não é NShiftEmptyMetadata.",
      "Parâmetros fora da lista seguem o dicionário Rainbow comum.",
      "A classe precisa ser serializável pelo kotlinx.serialization, porque o decoder chama serializer().",
    ],
    connects: "No Rainbow, o parâmetro listado pode ser @JSON(...). O compilador entrega o texto ao decoder. O resultado fica em AnyNShiftMetadata dentro de NShiftPluginModel ou NShiftEventModel.",
  },
  {
    path: "/android/anotacoes/processador",
    title: "NShiftSymbolProcessor",
    kicker: "KSP Android",
    lead: "Único SymbolProcessor do módulo :nshiftui-ksp. NShiftSymbolProcessorProvider cria NShiftSymbolProcessor. Ele agrega @NShiftPlugin e @NShiftEvent e escreve um instalador.",
    attribute: `class NShiftSymbolProcessorProvider : SymbolProcessorProvider {
    override fun create(environment: SymbolProcessorEnvironment): SymbolProcessor =
        NShiftSymbolProcessor(environment.codeGenerator, environment.logger)
}`,
    exampleTitle: "Arquivo gerado",
    example: `package com.nshiftui.generated

import com.nshiftui.NShiftDependencyContainer
import com.nshiftui.registerEvent
import com.nshiftui.registerPlugin

fun NShiftDependencyContainer.installNShiftGenerated() {
    registerPlugin<com.example.PrimaryButton>()
    registerEvent<com.example.Navigate>()
}`,
    notes: [
      "O processador roda uma vez. generatedInstaller impede uma segunda emissão.",
      "Sem símbolos anotados, não cria arquivo.",
      "O jar publicado na release v1.0.0 é nshiftui-ksp.jar. Sem esse processador no classpath do KSP, as anotações continuam válidas em runtime, mas installNShiftGenerated não existe.",
    ],
    connects: "O host chama installNShiftGenerated() no container antes de NShiftConfig.startup e de NShiftView. Esse é o equivalente Android de @NShiftPluginAssemble e @NShiftEventAssemble.",
  },
]
