import { Link, useLocation } from 'react-router-dom'

import { styled } from '@/stitches.config'

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
    <StyledNav>
      <ul>
        {items.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={
                (
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                )
                  ? 'navlink--active'
                  : 'navlink'
              }
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </StyledNav>
  )
}

const StyledNav = styled('nav', {
  '& ul': {
    display: 'flex',
    alignItems: 'center',
    gap: '$8',
    fontSize: '$sm',
    fontWeight: '$semibold',
    listStyle: 'none',
  },
  '.navlink': {
    color: '$slate400',
    transition: '$base',
    '&:hover': {
      color: '$slate200',
    },
  },
  '.navlink--active': {
    color: '$slate200',
  },
})
