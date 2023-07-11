import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
} from '@codemirror/autocomplete'
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands'
import {
  markdown,
  markdownKeymap,
  markdownLanguage,
} from '@codemirror/lang-markdown'
import {
  bracketMatching,
  defaultHighlightStyle,
  indentOnInput,
  indentUnit,
  syntaxHighlighting,
} from '@codemirror/language'
import { languages } from '@codemirror/language-data'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState, Extension } from '@codemirror/state'
import {
  EditorView,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
} from '@codemirror/view'
import { EditorConfig } from '~/types'

export function basicSetup(): Extension {
  return [
    history(),
    drawSelection(),
    dropCursor(),
    EditorState.allowMultipleSelections.of(true),
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...completionKeymap,
      ...markdownKeymap,
      indentWithTab,
    ]),
    markdown({
      base: markdownLanguage,
      codeLanguages: languages,
    }),
  ]
}
export function getCustomExtensionsFromConfig(config: EditorConfig) {
  return [
    config.lineNumbers ? lineNumbers() : [],
    config.highlightActiveLine
      ? [highlightActiveLine(), highlightActiveLineGutter()]
      : [],
    config.lineWrapping ? EditorView.lineWrapping : [],
    config.autocomplete ? autocompletion() : [],
    [
      EditorState.tabSize.of(config.tabSize),
      indentUnit.of(' '.repeat(config.tabSize)),
    ],
  ]
}
