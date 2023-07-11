import type { CSS, VariantProps } from '@stitches/react'
import { css, styled } from '~/stitches.config'
import { SVGProps } from '~/types/shared'

const iconVariants = css({
  variants: {
    size: {
      base: {
        h: '$5',
        w: '$5',
      },
      xs: {
        h: '$3',
        w: '$3',
      },
      sm: {
        h: '$4',
        w: '$4',
      },
      lg: {
        h: '$6',
        w: '$6',
      },
      xl: {
        h: '$8',
        w: '$8',
      },
      '2xl': {
        h: '$10',
        w: '$10',
      },
    },
  },
  defaultVariants: {
    size: 'base',
  },
})

interface IconProps extends SVGProps, VariantProps<typeof iconVariants> {
  as: React.FC<SVGProps>
  css?: CSS
}

function Icon({ as, size = 'base', ...props }: IconProps) {
  const StyledIcon = styled(as, {})
  return <StyledIcon className={iconVariants({ size })} {...props} />
}

export { Icon }
