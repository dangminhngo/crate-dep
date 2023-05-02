import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useNoteById } from '@/hooks'

export default function NotePage() {
  const params = useParams()
  const { status, data } = useNoteById(params.id as string)

  if (status === 'loading') return <div>Loading...</div>
  if (status === 'error') return <div>Loading...</div>

  return (
    <Container flex={1} px={4} py={32}>
      {JSON.stringify(data, null, 2)}
    </Container>
  )
}
