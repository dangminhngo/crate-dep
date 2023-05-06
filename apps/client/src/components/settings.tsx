import { useDispatch, useSelector } from '@/hooks'
import { styled } from '@/stitches.config'
import {
  _toggleAutocomplete,
  _toggleHighlightActiveLine,
  _toggleLineNumbers,
  _toggleLineWrapping,
} from '@/store/slices/settings.slice'
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
  Icon,
  Switch,
  SwitchThumb,
} from './primitive'
import SectionButton from './shared/section-button'

export default function Settings() {
  const { editor } = useSelector((state) => state.settings)
  const dispatch = useDispatch()

  const toggleAutocomplete = () => dispatch(_toggleAutocomplete())
  const toggleLineNumbers = () => dispatch(_toggleLineNumbers())
  const toggleLineWrapping = () => dispatch(_toggleLineWrapping())
  const toggleHighlightActiveLine = () => dispatch(_toggleHighlightActiveLine())

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
            <div className="section">
              <h3 className="section__title">Editor Configurations</h3>
              <div className="section__container">
                <SettingsSwitch
                  id="autocomplete"
                  title="Autocomplete"
                  description="Enable autocomplete engine"
                  checked={editor.autocomplete}
                  onClick={toggleAutocomplete}
                />
                <SettingsSwitch
                  id="line-numbers"
                  title="Line numbers"
                  description="Show editor line numbers"
                  checked={editor.lineNumbers}
                  onClick={toggleLineNumbers}
                />
                <SettingsSwitch
                  id="active-line"
                  title="Highlight active line"
                  description="Highlight editor active line"
                  checked={editor.highlightActiveLine}
                  onClick={toggleHighlightActiveLine}
                />
                <SettingsSwitch
                  id="line-wrap"
                  title="Line wrapping"
                  description="Wrap the line if they overflow the editor width"
                  checked={editor.lineWrapping}
                  onClick={toggleHighlightActiveLine}
                />
              </div>
            </div>
          </StyledSettingsContainer>
          <DialogClose>
            <Icon as={Clear} />
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

  '.section': {
    display: 'flex',
    flexDirection: 'column',
    gap: '$8',
  },

  '.section__title': {
    fontWeight: '$semibold',
  },

  '.section__container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$8',
  },
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
