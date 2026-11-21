import { androidAnnotations } from "@/docs/android-annotations"
import { androidDomain } from "@/docs/android-domain"
import { iosDomain } from "@/docs/ios-domain"
import { iosMacros } from "@/docs/ios-macros"
import { linksOf } from "@/docs/reference"

export type DocLink = {
  title: string
  path: string
}

export type DocGroup = {
  id: string
  title: string
  pages: DocLink[]
  sections?: DocGroup[]
}

export const overview: DocLink = {
  title: "Visão geral",
  path: "/visao-geral",
}

export const groups: DocGroup[] = [
  {
    id: "rainbow",
    title: "Rainbow",
    pages: [
      { title: "Instalação", path: "/rainbow/instalacao" },
      { title: "Gramática", path: "/rainbow/gramatica" },
      { title: "Léxico e valores", path: "/rainbow/lexico" },
      { title: "Nomes e construtores", path: "/rainbow/nomes" },
      { title: "Placeholders", path: "/rainbow/placeholders" },
      { title: "Valores @LANG", path: "/rainbow/lang" },
      { title: "Formato canônico", path: "/rainbow/formato" },
      { title: "Paridade", path: "/rainbow/paridade" },
      { title: "WASM", path: "/rainbow/wasm" },
      { title: "API Rust", path: "/rainbow/api" },
    ],
  },
  {
    id: "android",
    title: "Android",
    pages: [
      { title: "Instalação", path: "/android/instalacao" },
      { title: "Parser", path: "/android/parser" },
      { title: "Runtime", path: "/android/runtime" },
      { title: "Build e KSP", path: "/android/build" },
    ],
    sections: [
      { id: "android-anotacoes", title: "Anotações", pages: linksOf(androidAnnotations) },
      { id: "android-dominio", title: "Domínio", pages: linksOf(androidDomain) },
    ],
  },
  {
    id: "ios",
    title: "iOS",
    pages: [
      { title: "Instalação", path: "/ios/instalacao" },
      { title: "Parser", path: "/ios/parser" },
      { title: "Runtime", path: "/ios/runtime" },
      { title: "Arranque", path: "/ios/macros" },
    ],
    sections: [
      { id: "ios-macros", title: "Macros", pages: linksOf(iosMacros) },
      { id: "ios-dominio", title: "Domínio", pages: linksOf(iosDomain) },
    ],
  },
  {
    id: "poc",
    title: "POC",
    pages: [
      { title: "O repositório", path: "/poc/repositorio" },
      { title: "Executar", path: "/poc/executar" },
    ],
  },
  {
    id: "cli",
    title: "CLI",
    pages: [
      { title: "Instalação", path: "/cli/instalacao" },
      { title: "Comandos", path: "/cli/comandos" },
      { title: "Editor", path: "/cli/editor" },
    ],
  },
]

function walk(group: DocGroup): DocLink[] {
  return [...group.pages, ...(group.sections?.flatMap(walk) ?? [])]
}

export const flatPages: DocLink[] = [overview, ...groups.flatMap(walk)]

export function pageByPath(path: string) {
  return flatPages.find((page) => page.path === path)
}

export function neighbors(path: string) {
  const index = flatPages.findIndex((page) => page.path === path)
  return {
    previous: index > 0 ? flatPages[index - 1] : undefined,
    next: index >= 0 && index < flatPages.length - 1 ? flatPages[index + 1] : undefined,
  }
}

export function groupContains(group: DocGroup, path: string): boolean {
  if (group.pages.some((page) => page.path === path)) return true
  return group.sections?.some((section) => groupContains(section, path)) ?? false
}
