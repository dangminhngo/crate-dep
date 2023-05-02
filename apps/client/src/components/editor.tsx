import { Box } from '@chakra-ui/react'

import { useEditor } from '@/hooks'
import type { EditorConfig } from '@/types'

interface EditorProps {
  code: string
  setCode: (c: string) => void
  config: EditorConfig
}

export default function Editor({ code, setCode, config }: EditorProps) {
  const { ref } = useEditor({ code, setCode, config })
  return (
    <Box
      ref={ref}
      height="100%"
      overflow="hidden"
      sx={{
        '.cm-editor': {
          minH: '100%',
          w: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'mono',
          fontSize: 'md',
        },
        '.cm-scroller': {
          overflow: 'auto',
          flexGrow: 1,
        },
        '.cm-gutter': {
          lineHeight: 'taller',
        },
        '.cm-gutterElement': {
          pl: `0.75rem !important`,
          pr: `1.5rem !important`,
        },
        '.cm-line': {
          lineHeight: 'taller',
        },
        '.cm-lineWrapping': {
          p: `0 !important`,
        },
      }}
    />
  )
}
