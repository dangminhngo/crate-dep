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
    <nav>
      <ul className="list-style-none flex items-center gap-8 text-sm font-semibold">
        {items.map((item) => (
          <li key={item.title}>
            <Link
              to={item.href}
              className={`${
                (
                  item.href === '/'
                    ? pathname === item.href
                    : pathname.startsWith(item.href)
                )
                  ? 'text-slate-100'
                  : 'text-slate-400 hover:text-slate-200'
              } transition-colors duration-300`}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
