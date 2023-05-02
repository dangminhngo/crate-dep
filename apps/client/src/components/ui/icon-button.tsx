import { Button, Icon, Tooltip } from '@chakra-ui/react'

import { SVGProps } from '@/types/shared'

interface IconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.FC<SVGProps>
  tooltip?: string
}

export default function IconButton({
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
        _hover={{
          color: 'brand.primary',
          bg: 'slate.700',
        }}
      >
        <Icon h={5} w={5} as={ButtonIcon} />
      </Button>
    </Tooltip>
  )
}
