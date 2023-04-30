import { ChakraBaseProvider } from '@chakra-ui/react'

import { getTheme } from '@/theme'

export default function ChakraProvider({ children }: React.PropsWithChildren) {
  const theme = getTheme()
  return <ChakraBaseProvider theme={theme}>{children}</ChakraBaseProvider>
}
