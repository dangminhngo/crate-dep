import { Button, Icon, Tooltip } from '@chakra-ui/react'

import { SVGProps } from '@/types/shared'

const sectionButtonVariants = {
  variants: {
    default: {
      color: 'slate.300',
      _hover: {
        color: 'slate.100',
        bg: 'slate.800',
      },
    },
    danger: {
      color: 'red',
      _hover: {
        color: 'red',
        bg: 'slate.800',
      },
    },
  },
}

interface SectionButtonProps extends React.PropsWithChildren {
  icon: React.FC<SVGProps>
  variant?: 'default' | 'danger'
  tooltip?: string
  onClick: () => void
}

export default function SectionButton({
  icon: ButtonIcon,
  variant = 'default',
  tooltip = '',
  children,
  onClick,
}: SectionButtonProps) {
  return (
    <Tooltip label={tooltip} placement="right" openDelay={250} ml={2}>
      <Button
        variant="unstyled"
        px={4}
        py={2.5}
        h="auto"
        bg="transparent"
        display="flex"
        alignItems="center"
        justifyContent="start"
        gap={3}
        transitionProperty="color, background-color, border-color"
        transitionDuration="0.15s"
        transitionTimingFunction="ease-out"
        {...sectionButtonVariants.variants[variant]}
        onClick={onClick}
      >
        <Icon h={5} w={5} as={ButtonIcon} />
        {children}
      </Button>
    </Tooltip>
  )
}
