import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import Editor from '@/components/editor'
import { useNoteById } from '@/hooks'

export default function NotePage() {
  const params = useParams()
  const { status, data } = useNoteById(params.id as string)

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Loading...</div>

  return (
    <Container flex={1}>
      <Editor
        code={data.code}
        setCode={(c) => console.log(c)}
        config={{
          autocomplete: true,
          highlightActiveLine: true,
          lineNumbers: true,
          lineWrapping: true,
          tabSize: 2,
        }}
      />
    </Container>
  )
}
