import { useAuth0 } from '@auth0/auth0-react'
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Icon,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Logo from './logo'
import MainNav from './main-nav'

export default function Header() {
  const { loginWithRedirect } = useAuth0()

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/app',
      },
      authorizationParams: {
        prompt: 'login',
      },
    })
  }

  return (
    <Box as="header">
      <Center borderBottom="1px" borderColor="slate.800">
        <Container maxW="1280px" w="1280px" py={4} px={10}>
          <Flex align="center" gap={12}>
            <Link to="/">
              <Flex align="center" gap={3} color="brand.primary">
                <Icon as={Logo} boxSize={8} />
                <Text
                  fontFamily="heading"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize={24}
                >
                  Crate
                </Text>
              </Flex>
            </Link>
            <MainNav />
            <Spacer />
            <Flex align="center" gap={4}>
              <Button variant="text" onClick={handleLogin}>
                Sign in
              </Button>
              <Button>Try for free</Button>
            </Flex>
          </Flex>
        </Container>
      </Center>
    </Box>
  )
}
