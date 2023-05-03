import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { useEditor } from '@/hooks'
import type { EditorConfig } from '@/types'

interface EditorProps {
  code: string
  setCode: (c: string) => void
  config: EditorConfig
}

export default function Editor({ code, setCode, config }: EditorProps) {
  const { ref } = useEditor({ code, setCode, config })
  return <StyledEditor ref={ref} height="100%" overflow="auto" />
}

const StyledEditor = styled(Box)`
  .cm-editor {
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    font-family: var(--chakra-fonts-mono);
    font-size: var(--chakra-fontSizes-md);
  }
  .cm-scroller {
    overflow: auto;
    flex-grow: 1;
  }
  .cm-gutter {
    line-height: var(--chakra-lineHeights-tall);
  }
  .cm-gutterElement {
    padding-left: 0.75rem !important;
    padding-right: 1.5rem !important;
  }
  .cm-line {
    line-height: var(--chakra-lineHeights-tall);
  }
`
