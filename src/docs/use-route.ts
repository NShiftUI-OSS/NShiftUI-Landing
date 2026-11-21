import { useEffect, useState } from "react"

import { pageByPath } from "@/docs/nav"

export function readRoute() {
  const raw = window.location.hash.replace(/^#/, "")
  const path = raw.startsWith("/") ? raw : raw ? `/${raw}` : "/visao-geral"
  return pageByPath(path) ? path : "/visao-geral"
}

export function useRoute() {
  const [path, setPath] = useState(readRoute)

  useEffect(() => {
    const sync = () => setPath(readRoute())
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  return path
}

export function href(path: string) {
  return `#${path}`
}
