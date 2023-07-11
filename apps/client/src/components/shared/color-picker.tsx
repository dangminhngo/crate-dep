import { HexColorPicker } from 'react-colorful'
import { styled } from '~/stitches.config'

interface ColorPickerProps
  extends React.ComponentPropsWithoutRef<typeof HexColorPicker> {
  label?: string
}

export default function ColorPicker({
  label = 'Choose a color',
  ...props
}: ColorPickerProps) {
  return (
    <StyledColorPicker>
      <div className="label">
        <label>{label}</label>
        <span>{props.color}</span>
      </div>
      <HexColorPicker {...props} />
    </StyledColorPicker>
  )
}

const StyledColorPicker = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  '.label': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '& label': {
    fontWeight: '$medium',
    lineHeight: '$base',
  },
  '.react-colorful': {
    w: '$full',
  },

  '.react-colorful__saturation, .react-colorful__hue': {
    br: '$base',
  },

  '.react-colorful__pointer.react-colorful__saturation-pointer': {
    h: '$2',
    w: '$2',
  },
  '.react-colorful__pointer.react-colorful__hue-pointer': {
    h: '$full',
    w: '$2',
    br: 0,
  },
})
