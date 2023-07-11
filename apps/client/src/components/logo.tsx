import { SVGProps } from '~/types/shared'

export default function Logo(props: SVGProps) {
  return (
    <svg
      {...props}
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_2)">
        <rect
          x="96"
          y="96"
          width="320"
          height="320"
          stroke="currentColor"
          strokeWidth="16"
        />
        <rect width="192" height="192" fill="currentColor" />
        <rect x="320" width="192" height="192" fill="currentColor" />
        <rect x="320" y="320" width="192" height="192" fill="currentColor" />
        <rect
          x="8"
          y="328"
          width="176"
          height="176"
          stroke="currentColor"
          strokeWidth="16"
        />
        <circle cx="96" cy="416" r="40" fill="currentColor" />
      </g>
    </svg>
  )
}
