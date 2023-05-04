import { useEditor } from '@/hooks'
import type { EditorConfig } from '@/types'

interface EditorProps {
  code: string
  setCode: (c: string) => void
  config: EditorConfig
}

export default function Editor({ code, setCode, config }: EditorProps) {
  const { ref } = useEditor({ code, setCode, config })
  return <div ref={ref} />
}
