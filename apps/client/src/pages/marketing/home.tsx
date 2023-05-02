import { Button, Center, Container, Flex, Heading } from '@chakra-ui/react'

export default function HomePage() {
  return (
    <Center>
      <Container
        maxW="1280px"
        w="1280px"
        px={10}
        py="200px"
        minH="calc(100vh - 61px)"
      >
        <Flex direction="column" align="center" gap={24}>
          <Flex
            direction="column"
            align="center"
            gap={8}
            fontFamily="heading"
            fontWeight="bold"
          >
            <Heading fontSize="4xl">Changes the way a developer</Heading>
            <Heading as="h1" fontSize="8xl" color="brand.primary">
              writes markdown
            </Heading>
          </Flex>
          <Flex gap={4}>
            <Button size="lg">Try now</Button>
            <Button variant="outline" size="lg">
              Github
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Center>
  )
}
