import { Container, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <Container>
      <Flex>
        <Heading as="h2">Oops!</Heading>
        <Text>There was an unexpected error.</Text>
      </Flex>
    </Container>
  )
}
