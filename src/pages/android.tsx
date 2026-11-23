import { Article, CodeBlock, DownloadLink, Ext, H2, K, P, Ul } from "@/components/doc"
import { repos } from "@/lib/links"

export function AndroidInstallPage() {
  return (
    <Article kicker="Android" title="Instalação">
      <P>
        Há dois artefatos. <Ext href={repos.parserAndroid}>RainbowParser-Android</Ext> <K>1.0.0</K> é a sintaxe. <Ext href={repos.android}>NShiftUI-Android</Ext> <K>1.0.0</K> é o runtime: <K>NShiftRainbowCompiler</K>, DI, engine e <K>NShiftView</K>. Pacote <K>com.nshiftui</K>, <K>minSdk</K> 23, <K>namespace</K> <K>com.nshiftui</K>.
      </P>
      <div className="flex flex-wrap gap-3">
        <DownloadLink href={repos.androidAar}>AAR do runtime</DownloadLink>
        <DownloadLink href={repos.androidKsp}>nshiftui-ksp.jar</DownloadLink>
        <DownloadLink href={repos.parserAndroidAar}>AAR do parser</DownloadLink>
      </div>
      <P>
        A release <Ext href={repos.androidRelease}>v1.0.0</Ext> publica <K>NShiftUI-Android-release.aar</K> e <K>nshiftui-ksp.jar</K>. Não publica metadados Maven. O parser publicado é <K>RainbowParser-Android-release.aar</K>.
      </P>
      <P>
        O módulo do runtime declara <K>api("com.nshiftui.rainbowparser:rainbowparser:1.0.0:release@aar")</K>. O Ivy do repositório mapeia essa coordenada para o arquivo da tag, porque a release só hospeda o AAR.
      </P>
      <CodeBlock
        title="settings.gradle.kts do NShiftUI-Android"
        code={`ivy {
    url = uri(
        "https://github.com/NShiftUI-OSS/RainbowParser-Android/releases/download",
    )
    patternLayout {
        artifact("v[revision]/RainbowParser-Android-[classifier].[ext]")
    }
    metadataSources { artifact() }
}`}
      />
      <P>
        Para trabalhar no código, clone os dois repositórios. O build pede <K>ANDROID_HOME</K> ou <K>sdk.dir</K> em <K>local.properties</K>.
      </P>
      <CodeBlock
        code={`git clone https://github.com/NShiftUI-OSS/RainbowParser-Android.git
git clone https://github.com/NShiftUI-OSS/NShiftUI-Android.git`}
      />
    </Article>
  )
}

export function AndroidParserPage() {
  return (
    <Article kicker="Android" title="Parser">
      <P>
        <K>com.nshiftui.rainbowparser</K>, versão <K>RainbowParserVersion.current</K> = <K>1.0.0</K>. Zero dependências de runtime. Não valida semântica de <K>Screen</K>, <K>Button</K> ou <K>OnTap</K>. Isso fica no NShiftUI.
      </P>
      <P>{"O parser lê Rainbow já expandido. Furos #{Nome} e expand pertencem ao RainbowParser-Rust."}</P>
      <CodeBlock
        title="pipeline"
        code={`String → RainbowLexer → [RainbowToken] → RainbowSyntaxParser
      → RainbowDocument → RainbowPrinter → String`}
      />
      <CodeBlock
        title="API pública"
        code={`val parser = RainbowParser()
val document = parser.decode(source)
val encoded = parser.encode(document)

val document2 = RainbowDecoder().decode(source)
val encoded2 = RainbowEncoder().encode(document2)`}
      />
      <Ul>
        <li>{"() são parâmetros. {} são filhos e fluxo."}</li>
        <li>Enums na fonte usam <K>.name</K>. A AST guarda o identificador sem o ponto.</li>
        <li>Erros de parse: <K>RainbowParseError</K> com <K>diagnostics</K>.</li>
        <li>O <K>Int</K> de 64 bits do iOS vira <K>Long</K> no Kotlin.</li>
        <li>Não há CLI, LSP, NDK/JNI, registry nem validate semântico neste AAR.</li>
      </Ul>
      <P>
        Toolchain da tag: Gradle 9.7.1, AGP 9.4.1, Kotlin 2.4.20, <K>compileSdk</K> 37, bytecode Java 21. O daemon usa JDK 25. <K>kotlinx-coroutines-core</K> só nos testes.
      </P>
      <CodeBlock code={`./gradlew test\n./gradlew assemble`} />
    </Article>
  )
}

export function AndroidRuntimePage() {
  return (
    <Article kicker="Android" title="Runtime">
      <P>
        Na tag <K>v1.0.0</K>, <K>NShiftUIVersion.current</K> é <K>1.0.0</K>. O pin do parser continua <K>com.nshiftui.rainbowparser:rainbowparser:1.0.0</K>. O runtime faz a semântica em cima do <K>RainbowDocument</K>.
      </P>
      <Ul>
        <li><K>NShiftRainbowCompiler</K> compila a fonte Rainbow para o modelo de plugins.</li>
        <li><K>NShiftView</K> desenha a árvore.</li>
        <li>Plugins e events, sem KSP, herdam <K>NShiftPlugin</K> e <K>NShiftEvent</K>.</li>
        <li>
          <K>NShiftRegisteredVersionCatalog</K> recusa o mesmo nome como plugin e como event. O padrão lança <K>NShiftRegisteredVersionCatalogFailure</K>, uma <K>IllegalStateException</K>.
        </li>
      </Ul>
      <P>
        Dependências do módulo na tag: Compose BOM <K>2026.09.00</K>, <K>compileSdk</K> 37, <K>minSdk</K> 23, Java 21, <K>kotlinx-coroutines-android</K> 1.11.0 e <K>kotlinx-serialization-json</K> 1.9.0.
      </P>
    </Article>
  )
}

export function AndroidBuildPage() {
  return (
    <Article kicker="Android" title="Build e KSP">
      <P>
        KSP é opcional, no módulo <K>:nshiftui-ksp</K>. O jar da release <K>v1.0.0</K> é <Ext href={repos.androidKsp}>nshiftui-ksp.jar</Ext>. O Gradle desse módulo usa o grupo <K>com.nshiftui</K> e a versão <K>1.0.0</K>. Sem KSP, plugins e events herdam <K>NShiftPlugin</K> e <K>NShiftEvent</K>.
      </P>
      <H2>Toolchain da tag v1.0.0</H2>
      <Ul>
        <li>Gradle 9.7.1</li>
        <li>Android Gradle Plugin 9.4.1</li>
        <li>Kotlin 2.4.20 e o plugin Compose da mesma versão</li>
        <li>KSP 2.3.12 no build raiz</li>
        <li>Compose BOM 2026.09.00</li>
        <li><K>compileSdk</K> 37, bytecode Java 21, JDK 25 no daemon</li>
      </Ul>
      <CodeBlock
        title="artefatos locais"
        code={`./gradlew :nshiftui:assembleRelease :nshiftui-ksp:jar`}
      />
      <P>
        A release no GitHub é manual: Actions, workflow Release, branch e SemVer com ou sem <K>v</K>. O ator permitido documentado no README é <K>ArthurPorto-PucMinas</K>. O bump atualiza <K>NShiftUIVersion.current</K> e as versões de <K>:nshiftui</K> e <K>:nshiftui-ksp</K>. Não altera o pin do RainbowParser.
      </P>
    </Article>
  )
}
