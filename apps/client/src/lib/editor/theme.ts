import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'

import type { Theme } from '@/stitches.config'

export function createEditorThemeExtension(theme: Theme) {
  const c = JSON.parse(JSON.stringify(theme.colors))

  const codeMirrorTheme = EditorView.theme(
    {
      '&': {
        color: c.editorFg,
        backgroundColor: c.editorBg,
      },

      '.cm-content': {
        caretColor: c.editorCursorBg,
      },

      '.cm-cursor, .cm-dropCursor': { borderLeftColor: c.editorCursorBg },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        {
          backgroundColor: c.editorSelectionBg,
        },

      '.cm-panels': {
        backgroundColor: c.editorPanelBg,
        color: c.editorPanelFg,
      },
      '.cm-panels.cm-panels-top': {
        borderBottom: c.editorPanelBorder ?? 'none',
      },
      '.cm-panels.cm-panels-bottom': {
        borderTop: c.editorPanelBorder ?? 'none',
      },

      '.cm-searchMatch': {
        backgroundColor: c.editorSearchMatchBg,
        outline: c.editorSearchMatchBorder ?? 'none',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: c.editorSearchMatchBg,
      },

      '.cm-activeLine': { backgroundColor: c.editorActiveLineBg },
      '.cm-selectionMatch': { backgroundColor: c.editorSelectionBg },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: c.editorBracketMatchBg,
      },

      '.cm-gutters': {
        backgroundColor: c.editorGutterBg,
        color: c.editorGutterFg,
        border: c.editorGutterBorder ?? 'none',
      },

      '.cm-activeLineGutter': {
        backgroundColor: c.editorActiveLineGutterBg,
      },

      '.cm-foldPlaceholder': {
        backgroundColor: c.editorFoldPlaceholderBg,
        color: c.editorFoldPlaceholderFg,
        border: c.editorFoldPlaceholderBorder ?? 'none',
      },

      '.cm-tooltip': {
        backgroundColor: c.editorTooltipBg,
        border: c.editorTooltipBorder ?? 'none',
      },

      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },

      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: c.editorTooltipBg,
        borderBottomColor: c.editorTooltipBg,
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: c.editorSelectionBg,
          color: c.editorTooltipFg,
        },
      },
    },
    { dark: true }
  )

  /// The highlighting style for code in codemirror.
  const codeMirrorHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.modifier], color: c.tokenKeyword },
    { tag: [t.definition(t.name)], color: c.tokenVariable },
    { tag: [t.definition(t.function(t.name))], color: c.tokenFunction },
    {
      tag: [t.deleted, t.character, t.propertyName, t.macroName],
      color: c.tokenProperty,
    },
    { tag: [t.attributeName], color: c.tokenAttribute },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.labelName,
      ],
      color: c.tokenFunction,
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: c.tokenConstant,
    },
    { tag: [t.separator], color: c.tokenDefinition },
    { tag: t.tagName, color: c.tokenTag },
    {
      tag: [
        t.typeName,
        t.className,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: c.tokenType,
    },
    {
      tag: [t.number],
      color: c.tokenNumber,
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
      color: c.tokenOperator,
    },
    { tag: [t.controlKeyword, t.moduleKeyword], color: c.tokenFlow },
    { tag: [t.meta, t.comment], color: c.tokenComment },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: c.tokenLink, textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: c.tokenHeading },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: c.tokenBoolean },
    { tag: [t.processingInstruction, t.inserted], color: c.tokenPreproc },
    { tag: [t.string, t.character], color: c.tokenString },
    { tag: [t.punctuation], color: c.tokenPunctuation },
    { tag: t.invalid, color: c.tokenInvalid },
  ])

  /// Extension to enable the One Dark theme (both the editor theme and
  /// the highlight style).
  return [codeMirrorTheme, syntaxHighlighting(codeMirrorHighlightStyle)]
}
