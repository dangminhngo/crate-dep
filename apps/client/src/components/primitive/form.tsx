import * as FormPrimitive from '@radix-ui/react-form'
import { styled } from '~/stitches.config'

const FormSubmit = FormPrimitive.Submit
const FormControl = FormPrimitive.Control
const FormValidityState = FormPrimitive.ValidityState

const Form = styled(FormPrimitive.Root, {
  w: '$full',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '$4',
})

const FormField = styled(FormPrimitive.Field, {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  mb: '$2.5',
})

const FormLabel = styled(FormPrimitive.Label, {
  mb: '$2',
  fontSize: '$sm',
  fontWeight: '$medium',
  lineHeight: '$base',
  color: '$slate200',
})

const FormMessage = styled(FormPrimitive.Message, {
  fontSize: '$xs',
  color: '$slate400',
})

export {
  Form,
  FormField,
  FormControl,
  FormSubmit,
  FormLabel,
  FormMessage,
  FormValidityState,
}
