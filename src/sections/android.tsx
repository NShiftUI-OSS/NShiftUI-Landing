import { CodeBlock, DownloadLink, Ext, H3, K, P } from "@/components/doc"
import { repos } from "@/lib/links"

export function AndroidSection() {
  return (
    <section id="android" className="scroll-mt-24 border-t border-border">
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">02 — Runtime</p>
        <h2 className="font-serif text-4xl tracking-tight sm:text-5xl">Android</h2>
        <P>
          <Ext href={repos.android}>NShiftUI-Android</Ext> é o runtime de plugins e events para Android. Pacote <K>com.nshiftui</K>, <K>minSdk</K> 23, <K>namespace</K> <K>com.nshiftui</K>. A release publicada é <Ext href={repos.androidRelease}>v0.2.0-beta.3</Ext>. Nela, <K>NShiftUIVersion.current</K> é <K>0.2.0-beta.3</K>.
        </P>
        <P>
          A sintaxe fica em <Ext href={repos.parserAndroid}>RainbowParser-Android</Ext> <K>0.1.0-beta.1</K>, pacote <K>com.nshiftui.rainbowparser</K>, sem dependência de runtime. Este AAR faz a semântica: <K>NShiftRainbowCompiler</K>, injeção de dependência, engine e <K>NShiftView</K>.
        </P>
        <P>
          O módulo de biblioteca declara <K>api("com.nshiftui.rainbowparser:rainbowparser:0.1.0-beta.1:release@aar")</K>. O GitHub Release do parser só hospeda o AAR, sem metadados Maven. O Ivy do repositório mapeia essa coordenada para o arquivo da tag.
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
        <div className="flex flex-wrap gap-3">
          <DownloadLink href={repos.androidAar}>AAR v0.2.0-beta.3</DownloadLink>
          <DownloadLink href={repos.androidKsp}>nshiftui-ksp.jar</DownloadLink>
          <DownloadLink href={repos.parserAndroidAar}>AAR do parser</DownloadLink>
        </div>
        <P>
          Os assets da release do runtime são <K>NShiftUI-Android-release.aar</K> e <K>nshiftui-ksp.jar</K>. O parser publicado é <K>RainbowParser-Android-release.aar</K>.
        </P>
        <H3>KSP</H3>
        <P>
          KSP é opcional, no módulo <K>:nshiftui-ksp</K>. Sem KSP, plugins e events herdam <K>NShiftPlugin</K> e <K>NShiftEvent</K>. O jar publicado na mesma release usa o grupo <K>com.nshiftui</K> e a versão <K>0.2.0-beta.3</K> no Gradle do módulo.
        </P>
        <H3>Toolchain e build</H3>
        <P>
          Na tag <K>v0.2.0-beta.3</K>: Gradle 9.7.1, Android Gradle Plugin 9.4.1, Kotlin 2.4.20, Compose BOM <K>2026.09.00</K>, <K>compileSdk</K> 37, bytecode Java 21. O README do repositório pede <K>ANDROID_HOME</K> ou <K>sdk.dir</K> em <K>local.properties</K>, e JDK 25 para o daemon (<K>gradle/gradle-daemon-jvm.properties</K>).
        </P>
        <CodeBlock
          title="build"
          code={`./gradlew :nshiftui:assembleRelease :nshiftui-ksp:jar`}
        />
        <P>
          <K>NShiftRegisteredVersionCatalog</K> recusa o mesmo nome como plugin e como event. O padrão lança <K>NShiftRegisteredVersionCatalogFailure</K>, uma <K>IllegalStateException</K>.
        </P>
      </div>
    </section>
  )
}
