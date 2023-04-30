import { Flex, Icon, Text } from '@chakra-ui/react'

import LoadingIndicator from './loading-indicator'

export default function Loading() {
  return (
    <Flex
      minHeight="100vh"
      direction="column"
      align="center"
      justify="center"
      gap={8}
    >
      <Icon as={LoadingIndicator} w={40} h={40} color="brand.primary" />
      <Text>Just a minute</Text>
    </Flex>
  )
}
