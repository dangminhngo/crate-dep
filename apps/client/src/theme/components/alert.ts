import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
  container: {
    bg: 'green',
    color: 'slate.900',
  },
  title: {},
})

const Alert = defineMultiStyleConfig({ baseStyle })

export default Alert
