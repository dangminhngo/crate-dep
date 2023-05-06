import { useEditor } from '@/hooks'
import { styled } from '@/stitches.config'
import type { EditorConfig } from '@/types'

interface EditorProps {
  code: string
  setCode: (c: string) => void
  config: EditorConfig
}

export default function Editor({ code, setCode, config }: EditorProps) {
  const { ref } = useEditor({ code, setCode, config })
  return <StyledEditor ref={ref} />
}

const StyledEditor = styled('div', {
  h: '$full',
  '.cm-editor': {
    minH: '$full',
    maxH: '$full',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: '$mono',
    fontSize: '$base',
    overflow: 'hidden',
  },
  '.cm-scroller': {
    overflow: 'auto',
    flexGrow: 1,
  },
  '.cm-gutter': {
    lineHeight: '$tall',
  },
  '.cm-gutterElement': {
    pl: '$3 !important',
    pr: '$6 !important',
  },
  '.cm-lineWrapping': {
    py: 0,
  },
  '.cm-line': {
    lineHeight: '$tall',
  },
})
