import ReactMarkdown from 'react-markdown'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { styled } from '@/stitches.config'
import { Container } from './primitive'

interface PreviewProps {
  code: string
}

export default function Preview({ code }: PreviewProps) {
  return (
    <StyledPreview>
      <Container className="container">
        <ReactMarkdown
          rehypePlugins={[rehypeCodeTitles, rehypePrism, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
        >
          {code}
        </ReactMarkdown>
      </Container>
    </StyledPreview>
  )
}

const StyledPreview = styled('div', {
  p: '$6',
  fontSize: '$base',
  h: '$full',
  backgroundColor: '$slate900',
  overflowX: 'hidden',
  overflowY: 'auto',

  '.container': {
    maxW: '$md',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  '& hr': {
    mt: '$4',
    borderColor: '$slate700',
  },
  '& a': {
    textDecoration: 'underline',
    color: '$tokenLink',
  },
  'h1, h2, h3, h4, h5, h6': {
    mt: '$4',
    color: '$tokenHeading',
    fontWeight: '$bold',
    lineHeight: '$short',
  },
  '& h1': {
    fontSize: '2em',
  },
  '& h2': {
    fontSize: '1.5em',
  },
  '& h3': {
    fontSize: '1.17em',
  },
  '& h4': {
    fontSize: '1em',
  },
  '& h5': {
    fontSize: '0.83em',
  },
  '& h6': {
    fontSize: '0.67em',
  },
  '& p': {
    lineHeight: '$tall',
  },
  '& > p': {
    mt: '$4',
  },
  '& table': {
    mt: '$4',
    borderCollapse: 'collapse',
  },
  'th, td': {
    py: '$2',
    px: '$4',
    textAlign: 'left',
    lineHeight: '$tall',
    border: '1px solid $slate700',
  },
  '& th': {
    fontWeight: '$semibold',
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: '$slate800',
  },
  '& blockquote': {
    my: '$4',
    px: '$4',
    py: '$2',
    border: '1px solid $slate700',
    br: '$base',
    backgroundColor: '$slate800',
  },
  '& ul': {
    pl: '$4',
    listStyle: 'disc',
    listStylePosition: 'inside',
    lineHeight: '$tall',
  },
  '& ol': {
    pl: '$4',
    listStyle: 'decimal',
    listStylePosition: 'inside',
    lineHeight: '$tall',
  },
  '& code': {
    px: '$2',
    py: '$1',
    border: '1px solid $slate700',
    br: '$sm',
    backgroundColor: '$slate800',
    fontFamily: '$mono',
    fontSize: '$md',
  },
  // Prism codeblock highlighting
  "code[class*='language-'], pre[class*='language-']": {
    px: 0,
    backgroundColor: '$editorBg',
    color: '$editorFg',
    fontFamily: '$mono',
    lineHeight: '$tall',
    border: 'none !important',
    borderRadius: '$base',
    direction: 'ltr',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    tabSize: 2,
    hyphens: 'none',
  },
  // Selection
  "code[class*='language-']::selection, code[class*='language-'] *::selection, pre[class*='language-'] *::selection":
    {
      background: '$editorSelectionBg',
      color: 'inherit',
      textShadow: 'none',
    },
  // Codeblocks
  "pre[class*='language-']": {
    px: '$6',
    py: '$4',
    my: '$4',
    overflow: 'auto',
    borderRadius: '$base',
  },
  // Inline code
  ":not(pre) > code[class*='language-']": {
    px: '$2',
    py: '$1',
    borderRadius: '$sm',
    whiteSpace: 'normal',
  },
  // Print
  '@media print': {
    "code[class*='language-'], pre[class*='language-']": {
      textShadow: 'none',
    },
  },

  // Language tokens
  '.token.comment, .token.prolog, .token.cdata': {
    color: '$tokenComment',
  },
  '.token.doctype, .token.punctuation, .token.entity': {
    color: '$tokenPunctuation',
  },
  '.token.class-name': {
    color: '$tokenType',
  },
  '.token.number': {
    color: '$tokenNumber',
  },
  '.token.boolean': {
    color: '$tokenBoolean',
  },
  '.token.constant': {
    color: '$tokenConstant',
  },
  '.token.attr-name, .token.atrule': {
    color: '$tokenAttribute',
  },
  '.token.keyword': {
    color: '$tokenKeyword',
  },
  '.token.keyword.module': {
    color: '$tokenFlow',
  },
  '.token.tag': {
    color: '$tokenTag',
  },
  '.token.property, .token.symbol, .token.deleted, .token.important': {
    color: '$tokenProperty',
  },
  '.token.selector, .token.string, .token.char, .token.builtin, .token.inserted, .token.regex, .token.attr-value, .token.attr-value > .token.punctuation':
    {
      color: '$tokenString',
    },
  '.token.parameter': {
    color: '$tokenParameter',
  },
  '.token.variable, .token.function': {
    color: '$tokenFunction',
  },
  '.token.operator': {
    color: '$tokenOperator',
  },
  '.token.url': {
    color: '$tokenLink',
  },
  // HTML overrides
  '.token.attr-value > .token.punctuation.attr-equals, .token.special-attr > .token.attr-value > .token.value.css':
    {
      color: '$tokenVariable',
    },
  // CSS overrides
  '.language-css .token.selector': {
    color: '$tokenBuiltin',
  },
  '.language-css .token.property': {
    color: '$tokenProperty',
  },
  '.language-css .token.function, .language-css .token.url > .token.function': {
    color: '$tokenLink',
  },
  '.language-css .token.url > .token.string.url': {
    color: '$tokenString',
  },
  '.language-css .token.important, .language-css .token.atrule .token.rule': {
    color: '$tokenKeyword',
  },
  // JS overrides
  '.language-javascript .token.operator': {
    color: '$tokenOperator',
  },
  '.language-javascript .token.template-string > .token.interpolation > .token.interpolation-punctuation.punctuation':
    {
      color: '$tokenPunctuation',
    },
  // JSON overrides
  '.language-json .token.operator': {
    color: '$tokenOperator',
  },
  '.language-json .token.null.keyword': {
    color: '$tokenBuiltin',
  },
  // Markdown overrides
  '.language-markdown .token.url, .language-markdown .token.url > .token.operator, .language-markdown .token.url-reference.url > .token.string':
    {
      color: '$tokenLink',
    },
  '.language-markdown .token.url > .token.content': {
    color: '$tokenLink',
  },
  '.language-markdown .token.url > .token.url, .language-markdown .token.url-reference.url':
    {
      color: '$tokenLink',
    },
  '.language-markdown .token.blockquote.punctuation, .language-markdown .token.hr.punctuation':
    {
      color: '$tokenPunctuation',
      fontStyle: 'italic',
    },
  '.language-markdown .token.code-snippet': {
    color: '$tokenString',
  },
  '.language-markdown .token.bold .token.content': {
    color: '$tokenConstant',
  },
  '.language-markdown .token.italic .token.content': {
    color: '$tokenKeyword',
  },
  '.language-markdown .token.strike .token.content, .language-markdown .token.strike .token.punctuation, .language-markdown .token.list.punctuation, .language-markdown .token.title.important > .token.punctuation':
    {
      color: '$tokenBuiltin',
    },
  // General
  '.token.bold': {
    fontWeight: 'bold',
  },
  '.token.comment, .token.italic': {
    fontStyle: 'italic',
  },
  '.token.entity': {
    cursor: 'help',
  },
  '.token.namespace': {
    opacity: 0.8,
  },
  /* Plugin overrides */
  /* Selectors should have higher specificity than those in the plugins' default stylesheets */
  /* Show Invisibles plugin overrides */
  '.token.token.tab:not(:empty):before, .token.token.cr:before, .token.token.lf:before, .token.token.space:before':
    {
      color: 'hsla(220, 14%, 71%, 0.15)',
      textShadow: 'none',
    },
  // Toolbar plugin overrides
  /* Space out all buttons and move them away from the right edge of the code block */
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item': {
    mr: '$2',
  },
  // Styling the buttons
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button, div.code-toolbar > .toolbar.toolbar > .toolbar-item > a, div.code-toolbar > .toolbar.toolbar > .toolbar-item > span':
    {
      backgroundColor: '$editorBg',
      color: '$editorFg',
      px: '$2',
      py: '$1',
      borderRadius: '$sm',
    },
  'div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover, div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus, div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover, div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus, div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover, div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus':
    {
      backgroundColor: '$editorBg',
      color: '$editorFg',
    },
  /* Line Highlight plugin overrides */
  /* The highlighted line itself */
  '.line-highlight.line-highlight': {
    backgroundColor: 'hsla(220, 100%, 80%, 0.04)',
  },
  /* Default line numbers in Line Highlight plugin */
  '.line-highlight.line-highlight:before, .line-highlight.line-highlight[data-end]:after':
    {
      backgroundColor: '$editorBg',
      color: '$editorFg',
      px: '$2',
      py: '$1',
      borderRadius: '$sm',
      boxShadow: '0 2px 0 0 rgba(0, 0, 0, 0.2)',
    },
  /* Hovering over a linkable line number (in the gutter area) */
  /* Requires Line Numbers plugin as well */
  'pre[id].linkable-line-numbers.linkable-line-numbers span.line-numbers-rows > span:hover:before':
    {
      backgroundColor: 'hsla(220, 100%, 80%, 0.04)',
    },
  /* Line Numbers and Command Line plugins overrides */
  /* Line separating gutter from coding area */
  '.line-numbers.line-numbers .line-numbers-rows, .command-line .command-line-prompt':
    {
      borderRightColor: 'hsla(220, 14%, 71%, 0.15)',
    },
  /* Stuff in the gutter */
  '.line-numbers .line-numbers-rows > span:before, .command-line .command-line-prompt > span:before':
    {
      color: '$tokenComment',
    },
  /* Match Braces plugin overrides */
  /* Note: Outline colour is inherited from the braces */
  '.rainbow-braces .token.token.punctuation.brace-level-1, .rainbow-braces .token.token.punctuation.brace-level-5, .rainbow-braces .token.token.punctuation.brace-level-9':
    {
      color: '$tokenPunctuation',
    },
  '.rainbow-braces .token.token.punctuation.brace-level-2, .rainbow-braces .token.token.punctuation.brace-level-6, .rainbow-braces .token.token.punctuation.brace-level-10':
    {
      color: '$tokenType',
    },
  '.rainbow-braces .token.token.punctuation.brace-level-3, .rainbow-braces .token.token.punctuation.brace-level-7, .rainbow-braces .token.token.punctuation.brace-level-11':
    {
      color: '$tokenBuiltin',
    },
  '.rainbow-braces .token.token.punctuation.brace-level-4, .rainbow-braces .token.token.punctuation.brace-level-8, .rainbow-braces .token.token.punctuation.brace-level-12':
    {
      color: '$tokenString',
    },
  /* Diff Highlight plugin overrides */
  /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
  'pre.diff-highlight > code .token.token.deleted:not(.prefix), pre > code.diff-highlight .token.token.deleted:not(.prefix)':
    {
      backgroundColor: 'hsla(353, 100%, 66%, 0.15)',
    },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection, pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection, pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection, pre > code.diff-highlight .token.token.deleted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection, pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection, pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection, pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection':
    {
      backgroundColor: 'hsla(353, 95%, 66%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix), pre > code.diff-highlight .token.token.inserted:not(.prefix)':
    {
      backgroundColor: 'hsla(137, 100%, 55%, 0.15)',
    },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection, pre.diff-highlight > code .token.token.inserted:not(.prefix) *::-moz-selection, pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection, pre > code.diff-highlight .token.token.inserted:not(.prefix) *::-moz-selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  'pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection, pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection, pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection, pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection':
    {
      backgroundColor: 'hsla(135, 73%, 55%, 0.25)',
    },
  /* Previewers plugin overrides */
  /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-dark-ui */
  /* Border around popup */
  '.prism-previewer.prism-previewer:before, .prism-previewer-gradient.prism-previewer-gradient div':
    {
      borderColor: 'hsl(224, 13%, 17%)',
    },
  /* Angle and time should remain as circles and are hence not included */
  '.prism-previewer-color.prism-previewer-color:before, .prism-previewer-gradient.prism-previewer-gradient div, .prism-previewer-easing.prism-previewer-easing:before':
    {
      borderRadius: '$sm',
    },
  /* Triangles pointing to the code */
  '.prism-previewer.prism-previewer:after': {
    borderTopColor: 'hsl(224, 13%, 17%)',
  },
  '.prism-previewer-flipped.prism-previewer-flipped.after': {
    borderBottomColor: 'hsl(224, 13%, 17%)',
  },
  /* Background colour within the popup */
  '.prism-previewer-angle.prism-previewer-angle:before, .prism-previewer-time.prism-previewer-time:before, .prism-previewer-easing.prism-previewer-easing':
    {
      background: '$editorBg',
    },
  /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
  /* For time, this is the alternate colour */
  '.prism-previewer-angle.prism-previewer-angle circle, .prism-previewer-time.prism-previewer-time circle':
    {
      stroke: '$editorFg',
      strokeOpacity: 1,
    },
  /* Stroke colours of the handle, direction point, and vector itself */
  '.prism-previewer-easing.prism-previewer-easing circle, .prism-previewer-easing.prism-previewer-easing path, .prism-previewer-easing.prism-previewer-easing line':
    {
      stroke: '$editorFg',
    },
  /* Fill colour of the handle */
  '.prism-previewer-easing.prism-previewer-easing circle': {
    fill: 'transparent',
  },
})
