import { Container } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

export default function NotePage() {
  const params = useParams()

  return (
    <Container flex={1} px={4} py={32}>
      {params.id}
    </Container>
  )
}
