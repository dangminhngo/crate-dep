import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type { EditorConfig } from '@/types'
import type { RootState } from '..'

interface SettingsState {
  editor: EditorConfig
}

const initialState: SettingsState = {
  editor: {
    autocomplete: true,
    lineNumbers: true,
    lineWrapping: true,
    highlightActiveLine: true,
    tabSize: 2,
  },
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    _toggleAutocomplete: (state) => {
      state.editor.autocomplete = !state.editor.autocomplete
    },
    _toggleLineNumbers: (state) => {
      state.editor.lineNumbers = !state.editor.lineNumbers
    },
    _toggleLineWrapping: (state) => {
      state.editor.lineWrapping = !state.editor.lineWrapping
    },
    _toggleHighlightActiveLine: (state) => {
      state.editor.highlightActiveLine = !state.editor.highlightActiveLine
    },
    _setTabSize: (state, action: PayloadAction<number>) => {
      state.editor.tabSize = action.payload
    },
  },
})

export const {
  _toggleAutocomplete,
  _toggleLineNumbers,
  _toggleLineWrapping,
  _toggleHighlightActiveLine,
  _setTabSize,
} = settingsSlice.actions

export const selectSettings = (state: RootState) => state.settings

export default settingsSlice.reducer
