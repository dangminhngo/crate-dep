import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createEditorThemeExtension(theme: any) {
  const c = theme.colors

  const codeMirrorTheme = EditorView.theme(
    {
      '&': {
        color: c.editor.fg,
        backgroundColor: c.editor.bg,
      },

      '.cm-content': {
        caretColor: c.editorCursor.bg,
      },

      '.cm-cursor, .cm-dropCursor': { borderLeftColor: c.editorCursor.bg },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        {
          backgroundColor: c.editorSelection.bg,
        },

      '.cm-panels': {
        backgroundColor: c.editorPanel.bg,
        color: c.editorPanel.fg,
      },
      '.cm-panels.cm-panels-top': {
        borderBottom: c.editorPanel.border ?? 'none',
      },
      '.cm-panels.cm-panels-bottom': {
        borderTop: c.editorPanel.border ?? 'none',
      },

      '.cm-searchMatch': {
        backgroundColor: c.editorSearchMatch.bg,
        outline: c.editorSearchMatch.border ?? 'none',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: c.editorSearchMatch.bg,
      },

      '.cm-activeLine': { backgroundColor: c.editorActiveLine.bg },
      '.cm-selectionMatch': { backgroundColor: c.editorSelection.bg },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: c.editorBracketMatch.bg,
      },

      '.cm-gutters': {
        backgroundColor: c.editorGutter.bg,
        color: c.editorGutter.fg,
        border: c.editorGutter.border ?? 'none',
      },

      '.cm-activeLineGutter': {
        backgroundColor: c.editorActiveLineGutter.bg,
      },

      '.cm-foldPlaceholder': {
        backgroundColor: c.editorFoldPlaceholder.bg,
        color: c.editorFoldPlaceholder.fg,
        border: c.editorFoldPlaceholder.border ?? 'none',
      },

      '.cm-tooltip': {
        backgroundColor: c.editorTooltip.bg,
        border: c.editorTooltip.border ?? 'none',
      },

      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },

      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: c.editorTooltip.bg,
        borderBottomColor: c.editorTooltip.bg,
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: c.editorSelection.bg,
          color: c.editorTooltip.fg,
        },
      },
    },
    { dark: true }
  )

  /// The highlighting style for code in codemirror.
  const tk = theme.colors.languageTokens

  const codeMirrorHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.modifier], color: tk.keyword },
    { tag: [t.definition(t.name)], color: tk.variable },
    { tag: [t.definition(t.function(t.name))], color: tk.function },
    {
      tag: [t.deleted, t.character, t.propertyName, t.macroName],
      color: tk.property,
    },
    { tag: [t.attributeName], color: tk.attribute },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.labelName,
      ],
      color: tk.function,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: tk.constant,
    },
    { tag: [t.separator], color: tk.definition },
    { tag: t.tagName, color: tk.tag },
    {
      tag: [
        t.typeName,
        t.className,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: tk.type,
    },
    {
      tag: [t.number],
      color: tk.number,
    },
    {
      tag: [
        t.operator,
        t.operatorKeyword,
        t.url,
        t.escape,
        t.regexp,
        t.special(t.string),
      ],
      color: tk.operator,
    },
    { tag: [t.controlKeyword, t.moduleKeyword], color: tk.flow },
    { tag: [t.meta, t.comment], color: tk.comment },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: tk.link, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: tk.heading },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: tk.boolean },
    { tag: [t.processingInstruction, t.inserted], color: tk.preproc },
    { tag: [t.string, t.character], color: tk.string },
    { tag: [t.punctuation], color: tk.punctuation },
    { tag: t.invalid, color: tk.invalid },
  ])

  /// Extension to enable the One Dark theme (both the editor theme and
  /// the highlight style).
  return [codeMirrorTheme, syntaxHighlighting(codeMirrorHighlightStyle)]
}
