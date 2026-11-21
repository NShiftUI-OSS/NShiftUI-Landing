import type { ReactNode } from "react"

import {
  AndroidBuildPage,
  AndroidInstallPage,
  AndroidParserPage,
  AndroidRuntimePage,
} from "@/pages/android"
import { CliCommandsPage, CliEditorPage, CliInstallPage } from "@/pages/cli"
import { IosInstallPage, IosMacrosPage, IosParserPage, IosRuntimePage } from "@/pages/ios"
import { OverviewPage } from "@/pages/overview"
import { PocRepoPage, PocRunPage } from "@/pages/poc"
import {
  RainbowApiPage,
  RainbowFormatPage,
  RainbowGrammarPage,
  RainbowInstallPage,
  RainbowLangPage,
  RainbowLexiconPage,
  RainbowNamesPage,
  RainbowParityPage,
  RainbowPlaceholdersPage,
  RainbowWasmPage,
} from "@/pages/rainbow"

export const pageComponents: Record<string, () => ReactNode> = {
  "/visao-geral": OverviewPage,
  "/rainbow/instalacao": RainbowInstallPage,
  "/rainbow/gramatica": RainbowGrammarPage,
  "/rainbow/lexico": RainbowLexiconPage,
  "/rainbow/nomes": RainbowNamesPage,
  "/rainbow/placeholders": RainbowPlaceholdersPage,
  "/rainbow/lang": RainbowLangPage,
  "/rainbow/formato": RainbowFormatPage,
  "/rainbow/paridade": RainbowParityPage,
  "/rainbow/wasm": RainbowWasmPage,
  "/rainbow/api": RainbowApiPage,
  "/android/instalacao": AndroidInstallPage,
  "/android/parser": AndroidParserPage,
  "/android/runtime": AndroidRuntimePage,
  "/android/build": AndroidBuildPage,
  "/ios/instalacao": IosInstallPage,
  "/ios/parser": IosParserPage,
  "/ios/runtime": IosRuntimePage,
  "/ios/macros": IosMacrosPage,
  "/poc/repositorio": PocRepoPage,
  "/poc/executar": PocRunPage,
  "/cli/instalacao": CliInstallPage,
  "/cli/comandos": CliCommandsPage,
  "/cli/editor": CliEditorPage,
}
