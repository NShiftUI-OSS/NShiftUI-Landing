export type ReferenceEntry = {
  path: string
  title: string
  kicker: string
  lead: string
  attribute?: string
  example?: string
  exampleTitle?: string
  generates?: string
  fields?: string[]
  notes?: string[]
  connects?: string
}

export function linksOf(entries: ReferenceEntry[]) {
  return entries.map((entry) => ({ title: entry.title, path: entry.path }))
}
