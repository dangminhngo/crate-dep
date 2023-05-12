import { useEditor, useSelector } from '@/hooks'
import { styled } from '@/stitches.config'

interface EditorProps {
  code: string
  setCode: (c: string) => void
}

export default function Editor({ code, setCode }: EditorProps) {
  const config = useSelector((state) => state.settings.editor)
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
    fontFamily: '$mono',
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
