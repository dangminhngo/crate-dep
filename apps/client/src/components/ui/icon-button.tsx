import { Button, Icon, Tooltip } from '@chakra-ui/react'

import { SVGProps } from '@/types/shared'

const iconButtonVariants = {
  variants: {
    default: {
      color: 'slate.300',
      _hover: {
        color: 'slate.100',
        bg: 'slate.700',
      },
    },
    danger: {
      color: 'red',
      _hover: {
        color: 'red',
        bg: 'slate.700',
      },
    },
  },
}

interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'danger'
  icon: React.FC<SVGProps>
  tooltip?: string
}

export default function IconButton({
  variant = 'default',
  icon: ButtonIcon,
  tooltip = '',
  ...props
}: IconProps) {
  return (
    <Tooltip label={tooltip} placement="top" openDelay={250}>
      <Button
        {...props}
        variant="unstyled"
        h={9}
        w={9}
        display="grid"
        placeItems="center"
        {...iconButtonVariants.variants[variant]}
      >
        <Icon h={5} w={5} as={ButtonIcon} />
      </Button>
    </Tooltip>
  )
}
