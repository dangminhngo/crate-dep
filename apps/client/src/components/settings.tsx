import { styled } from '@/stitches.config'
import { Clear, Cog } from './icons'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Switch,
  SwitchThumb,
} from './primitive'
import IconButton from './shared/icon-button'
import SectionButton from './shared/section-button'

export default function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SectionButton icon={Cog} tooltip="Change your settings">
          Settings
        </SectionButton>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            You can change your workspace settings
          </DialogDescription>
          <StyledSettingsContainer>
            <SettingsSwitch
              id="autocomplete"
              title="Autocomplete"
              description="Enable autocomplete engine"
              onClick={() => {
                console.log('Autocomplete')
              }}
            />
            <SettingsSwitch
              id="line-numbers"
              title="Line numbers"
              description="Show editor line numbers"
              onClick={() => {
                console.log('Line number')
              }}
            />
            <SettingsSwitch
              id="active-line"
              title="Highlight active line"
              description="Highlight editor active line"
              onClick={() => {
                console.log('Active line')
              }}
            />
            <SettingsSwitch
              id="line-wrap"
              title="Line wrapping"
              description="Wrap the line if they overflow the editor width"
              onClick={() => {
                console.log('Wrapping')
              }}
            />
          </StyledSettingsContainer>
          <DialogClose asChild>
            <IconButton
              tooltip="Close"
              css={{ position: 'absolute', top: '$2', right: '$2' }}
            >
              <Clear />
            </IconButton>
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

const StyledSettingsContainer = styled('div', {
  mt: '$8',
  fontSize: '$sm',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '$12',
})

interface SettingsSwitchProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  description: string
  id: string
  checked?: boolean
}

function SettingsSwitch({
  title,
  description,
  id,
  checked = false,
  ...props
}: SettingsSwitchProps) {
  return (
    <StyledSettingsSwitch>
      <div className="text">
        <div className="title">{title}</div>
        <p className="description">{description}</p>
      </div>
      <Switch id={id} data-state={checked ? 'checked' : 'unchecked'} {...props}>
        <SwitchThumb data-state={checked ? 'checked' : 'unchecked'} />
      </Switch>
    </StyledSettingsSwitch>
  )
}

const StyledSettingsSwitch = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  '.title': { fontWeight: '$semibold' },
  '.description': { mt: '$2', color: '$slate400' },
})
