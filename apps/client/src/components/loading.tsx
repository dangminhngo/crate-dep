import { Flex, Icon, Text } from '@chakra-ui/react'

import LoadingIndicator from './ui/loading-indicator'

interface LoadingProps {
  message?: string
}

export default function Loading({ message = 'Just a minute' }: LoadingProps) {
  return (
    <Flex
      minHeight="100vh"
      direction="column"
      align="center"
      justify="center"
      gap={8}
    >
      <Icon as={LoadingIndicator} w={40} h={40} color="brand.primary" />
      <Text>{message}</Text>
    </Flex>
  )
}
