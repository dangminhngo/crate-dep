import { Box, Flex, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

const items = [
  {
    title: 'Home',
    href: '/',
  },
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Documentation',
    href: '/documentation',
  },
  {
    title: 'Support',
    href: '/support',
  },
]
export default function MainNav() {
  const { pathname } = useLocation()

  return (
    <Box as="nav" fontSize={14} fontWeight="semibold">
      <Flex as="ul" align="center" gap={8} listStyleType="none">
        {items.map((item) => (
          <li key={item.title}>
            <Link to={item.href}>
              <Text
                color={
                  (
                    item.href === '/'
                      ? pathname === item.href
                      : pathname.startsWith(item.href) && pathname !== '/'
                  )
                    ? 'slate.100'
                    : 'slate.400'
                }
                transition="all .1s ease-out"
              >
                {item.title}
              </Text>
            </Link>
          </li>
        ))}
      </Flex>
    </Box>
  )
}
