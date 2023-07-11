import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import type { Theme } from '~/stitches.config'

export function createEditorThemeExtension(theme: Theme) {
  const c = theme.colors

  const codeMirrorTheme = EditorView.theme(
    {
      '&': {
        color: c.editorFg.toString(),
        backgroundColor: c.editorBg.toString(),
      },

      '.cm-content': {
        caretColor: c.editorCursorBg.toString(),
      },

      '.cm-cursor, .cm-dropCursor': {
        borderLeftColor: c.editorCursorBg.toString(),
      },
      '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
        {
          backgroundColor: c.editorSelectionBg.toString(),
        },

      '.cm-panels': {
        backgroundColor: c.editorPanelBg.toString(),
        color: c.editorPanelFg.toString(),
      },
      '.cm-panels.cm-panels-top': {
        borderBottom: c.editorPanelBorder.toString() ?? 'none',
      },
      '.cm-panels.cm-panels-bottom': {
        borderTop: c.editorPanelBorder.toString() ?? 'none',
      },

      '.cm-searchMatch': {
        backgroundColor: c.editorSearchMatchBg.toString(),
        // outline: c.editorSearchMatchBorder.toString() ?? 'none',
      },
      '.cm-searchMatch.cm-searchMatch-selected': {
        backgroundColor: c.editorSearchMatchBg.toString(),
      },

      '.cm-activeLine': { backgroundColor: c.editorActiveLineBg.toString() },
      '.cm-selectionMatch': { backgroundColor: c.editorSelectionBg.toString() },

      '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
        backgroundColor: c.editorBracketMatchBg.toString(),
      },

      '.cm-gutters': {
        backgroundColor: c.editorGutterBg.toString(),
        color: c.editorGutterFg.toString(),
        border: c.editorGutterBorder.toString() ?? 'none',
      },

      '.cm-activeLineGutter': {
        backgroundColor: c.editorActiveLineGutterBg.toString(),
      },

      '.cm-foldPlaceholder': {
        backgroundColor: c.editorFoldPlaceholderBg.toString(),
        color: c.editorFoldPlaceholderFg.toString(),
        // border: c.editorFoldPlaceholderBorder.toString() ?? 'none',
      },

      '.cm-tooltip': {
        backgroundColor: c.editorTooltipBg.toString(),
        // border: c.editorTooltipBorder.toString() ?? 'none',
      },

      '.cm-tooltip .cm-tooltip-arrow:before': {
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
      },

      '.cm-tooltip .cm-tooltip-arrow:after': {
        borderTopColor: c.editorTooltipBg.toString(),
        borderBottomColor: c.editorTooltipBg.toString(),
      },
      '.cm-tooltip-autocomplete': {
        '& > ul > li[aria-selected]': {
          backgroundColor: c.editorSelectionBg.toString(),
          color: c.editorTooltipFg.toString(),
        },
      },
    },
    { dark: true }
  )

  /// The highlighting style for code in codemirror.
  const codeMirrorHighlightStyle = HighlightStyle.define([
    { tag: [t.keyword, t.modifier], color: c.tokenKeyword.toString() },
    { tag: [t.definition(t.name)], color: c.tokenVariable.toString() },
    {
      tag: [t.definition(t.function(t.name))],
      color: c.tokenFunction.toString(),
    },
    {
      tag: [t.deleted, t.character, t.propertyName, t.macroName],
      color: c.tokenProperty.toString(),
    },
    { tag: [t.attributeName], color: c.tokenAttribute.toString() },
    {
      tag: [
        t.function(t.variableName),
        t.function(t.propertyName),
        t.labelName,
      ],
      color: c.tokenFunction.toString(),
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: c.tokenConstant.toString(),
    },
    { tag: [t.separator], color: c.tokenDefinition.toString() },
    { tag: t.tagName, color: c.tokenTag.toString() },
    {
      tag: [
        t.typeName,
        t.className,
        t.changed,
        t.annotation,
        t.self,
        t.namespace,
      ],
      color: c.tokenType.toString(),
    },
    {
      tag: [t.number],
      color: c.tokenNumber.toString(),
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
      color: c.tokenOperator.toString(),
    },
    { tag: [t.controlKeyword, t.moduleKeyword], color: c.tokenFlow.toString() },
    { tag: [t.meta, t.comment], color: c.tokenComment.toString() },
    { tag: t.strong, fontWeight: 'bold' },
    { tag: t.emphasis, fontStyle: 'italic' },
    { tag: t.strikethrough, textDecoration: 'line-through' },
    { tag: t.link, color: c.tokenLink.toString(), textDecoration: 'underline' },
    { tag: t.heading, fontWeight: 'bold', color: c.tokenHeading.toString() },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: c.tokenBoolean.toString(),
    },
    {
      tag: [t.processingInstruction, t.inserted],
      color: c.tokenPreproc.toString(),
    },
    { tag: [t.string, t.character], color: c.tokenString.toString() },
    { tag: [t.punctuation], color: c.tokenPunctuation.toString() },
    { tag: t.invalid, color: c.tokenInvalid.toString() },
  ])

  /// Extension to enable the One Dark theme (both the editor theme and
  /// the highlight style).
  return [codeMirrorTheme, syntaxHighlighting(codeMirrorHighlightStyle)]
}
