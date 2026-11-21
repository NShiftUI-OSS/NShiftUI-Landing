import { Article, CodeBlock, P, Ul } from "@/components/doc"
import type { ReferenceEntry } from "@/docs/reference"

export function ReferencePage({ entry }: { entry: ReferenceEntry }) {
  return (
    <Article kicker={entry.kicker} title={entry.title}>
      <P>{entry.lead}</P>
      {entry.attribute ? <CodeBlock title="Declaração" code={entry.attribute} /> : null}
      {entry.example ? <CodeBlock title={entry.exampleTitle ?? "Exemplo"} code={entry.example} /> : null}
      {entry.generates ? (
        <>
          <h2 className="pt-2 text-xl font-semibold tracking-tight">O que gera</h2>
          <CodeBlock code={entry.generates} />
        </>
      ) : null}
      {entry.fields && entry.fields.length > 0 ? (
        <>
          <h2 className="pt-2 text-xl font-semibold tracking-tight">Campos e operações</h2>
          <Ul>
            {entry.fields.map((field) => (
              <li key={field}>
                <code className="text-[0.92em]">{field}</code>
              </li>
            ))}
          </Ul>
        </>
      ) : null}
      {entry.notes && entry.notes.length > 0 ? (
        <Ul>
          {entry.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </Ul>
      ) : null}
      {entry.connects ? (
        <>
          <h2 className="pt-2 text-xl font-semibold tracking-tight">Como se liga</h2>
          <P>{entry.connects}</P>
        </>
      ) : null}
    </Article>
  )
}
