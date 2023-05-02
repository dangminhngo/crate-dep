import { motion, useTime, useTransform } from 'framer-motion'

import { SVGProps } from '@/types/shared'

export default function LoadingIndicator(props: SVGProps) {
  const time = useTime()
  const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false })

  return (
    <svg
      {...props}
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="131"
        y="131"
        width="250"
        height="250"
        stroke="currentColor"
        strokeWidth="12.5"
      />
      <rect x="56.0001" y="56" width="150" height="150" fill="currentColor" />
      <rect x="306" y="56" width="150" height="150" fill="currentColor" />
      <rect x="306" y="306" width="150" height="150" fill="currentColor" />
      <motion.rect
        style={{ rotate }}
        x="62.25"
        y="312.25"
        width="137.5"
        height="137.5"
        stroke="currentColor"
        strokeWidth="12.5"
      />
      <circle cx="131" cy="381" r="31.25" fill="currentColor" />
    </svg>
  )
}
