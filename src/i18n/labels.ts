const navKeys: Record<string, string> = {
  "Visão geral": "nav.overview",
  Instalação: "nav.install",
  Gramática: "nav.grammar",
  "Léxico e valores": "nav.lexicon",
  "Nomes e construtores": "nav.names",
  Placeholders: "nav.placeholders",
  "Valores @LANG": "nav.lang",
  "Formato canônico": "nav.format",
  Paridade: "nav.parity",
  "API Rust": "nav.rustApi",
  Parser: "nav.parser",
  Runtime: "nav.runtime",
  "Build e KSP": "nav.build",
  Anotações: "nav.annotations",
  Domínio: "nav.domain",
  Arranque: "nav.startup",
  Macros: "nav.macros",
  "O repositório": "nav.repo",
  Executar: "nav.run",
  Comandos: "nav.commands",
  Editor: "nav.editor",
}

export function navLabel(title: string, translate: (key: string) => string) {
  const key = navKeys[title]
  return key ? translate(key) : title
}
