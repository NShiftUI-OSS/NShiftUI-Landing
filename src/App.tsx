import { DocsShell } from "@/components/docs-shell"
import { pageComponents } from "@/pages/registry"
import { useRoute } from "@/docs/use-route"

export default function App() {
  const path = useRoute()
  const Page = pageComponents[path] ?? pageComponents["/visao-geral"]

  return (
    <DocsShell>
      <Page />
    </DocsShell>
  )
}
