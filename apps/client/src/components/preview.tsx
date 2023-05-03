import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import ReactMarkdown from 'react-markdown'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

interface PreviewProps {
  code: string
}

export default function Preview({ code }: PreviewProps) {
  return (
    <StyledPreview
      p={6}
      fontSize="md"
      height="100%"
      bg="slate.900"
      overflowX="hidden"
      overflowY="auto"
    >
      <ReactMarkdown
        rehypePlugins={[rehypeCodeTitles, rehypePrism, rehypeSlug]}
        remarkPlugins={[remarkGfm]}
      >
        {code}
      </ReactMarkdown>
    </StyledPreview>
  )
}

const StyledPreview = styled(Box)`
  hr {
    margin-top: 1rem;
    border-color: var(--chakra-colors-slate-700);
  }
  a {
    text-decoration: underline;
    color: var(--chakra-colors-languageTokens-link);
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1rem;
    color: var(--chakra-colors-languageTokens-heading);
    font-weight: var(--chakra-fontWeights-bold);
    line-height: var(--chakra-lineHeights-short);
  }
  h1 {
    font-size: 2em;
  }
  h2 {
    font-size: 1.5em;
  }
  h3 {
    font-size: 1.17em;
  }
  h4 {
    font-size: 1em;
  }
  h5 {
    font-size: 0.83em;
  }
  h6 {
    font-size: 0.67em;
  }
  p {
    padding: 0.5em 0;
    line-height: var(--chakra-lineHeights-tall);
  }
  & > p {
    margin-top: 1rem;
  }
  table {
    margin: 1em 0;
    border-collapse: collapse;
  }
  th,
  td {
    min-width: 6rem;
    padding: 0.5em 1em;
    text-align: left;
    line-height: var(--chakra-lineHeights-tall);
    border: 1px solid;
    border-color: var(--chakra-colors-slate-700);
  }
  th {
    font-weight: var(--chakra-fontWeights-bold);
  }
  tr {
    cursor: pointer;
    transition: all 0.15s ease-out;
  }
  tr:nth-of-type(even) {
  }
  blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border: 1px solid var(--chakra-colors-slate-700);
    border-radius: var(--chakra-radii-md);
    background-color: var(--chakra-colors-slate-800);
  }
  ul {
    padding-left: 1em;
    list-style: disc;
    list-style-position: inside;
    line-height: var(--chakra-lineHeights-tall);
  }
  ol {
    padding-left: 1em;
    list-style: decimal;
    list-style-position: inside;
    line-height: var(--chakra-lineHeights-tall);
  }
  code {
    padding: 0.15em 0.5em;
    background-color: var(--chakra-colors-slate-800);
    border: 1px solid var(--chakra-colors-slate-700);
    border-radius: var(--chakra-radii-base);
    font-family: var(--chakra-fonts-mono);
  }
  ,
  code[class*='language-'],
  pre[class*='language-'] {
    background: var(--chakra-colors-editor-bg);
    color: var(--chakra-colors-editor-fg);
    text-shadow: 0 1px rgba(0, 0, 0, 0.3);
    font-family: var(--chakra-fonts-mono);
    line-height: var(--chakra-lineHeights-tall);
    border: none;
    border-radius: 0;
    direction: ltr;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    -moz-tab-size: 2;
    -o-tab-size: 2;
    tab-size: 2;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }
  /* Selection */
  code[class*='language-']::-moz-selection,
  code[class*='language-'] *::-moz-selection,
  pre[class*='language-'] *::-moz-selection {
    background: var(--chakra-colors-editorSelection-bg);
    color: inherit;
    text-shadow: none;
  }
  code[class*='language-']::selection,
  code[class*='language-'] *::selection,
  pre[class*='language-'] *::selection {
    background: var(--chakra-colors-editorSelection-bg);
    color: inherit;
    text-shadow: none;
  }
  /* Code blocks */
  pre[class*='language-'] {
    padding: 1.5em;
    margin: 1em 0;
    overflow: auto;
    border-radius: var(--chakra-radii-base);
  }
  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.2em 0.3em;
    border-radius: 0.3em;
    white-space: normal;
  }
  /* Print */
  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }
  .token.comment,
  .token.prolog,
  .token.cdata {
    color: var(--chakra-colors-languageTokens-comment);
  }
  .token.doctype,
  .token.punctuation,
  .token.entity {
    color: var(--chakra-colors-languageTokens-punctuation);
  }
  .token.class-name {
    color: var(--chakra-colors-languageTokens-type);
  }
  .token.number {
    color: var(--chakra-colors-languageTokens-number);
  }
  .token.boolean {
    color: var(--chakra-colors-languageTokens-boolean);
    font-style: italic;
  }
  .token.constant {
    color: var(--chakra-colors-languageTokens-constant);
  }
  .token.attr-name,
  .token.atrule {
    color: var(--chakra-colors-languageTokens-attribute);
  }
  .token.keyword {
    color: var(--chakra-colors-languageTokens-keyword);
  }
  .token.keyword.module {
    color: var(--chakra-colors-languageTokens-flow);
  }
  .token.tag {
    color: var(--chakra-colors-languageTokens-tag);
  }
  .token.property,
  .token.symbol,
  .token.deleted,
  .token.important {
    color: var(--chakra-colors-languageTokens-property);
  }
  .token.selector,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted,
  .token.regex,
  .token.attr-value,
  .token.attr-value > .token.punctuation {
    color: var(--chakra-colors-languageTokens-string);
  }
  .token.parameter {
    color: var(--chakra-colors-languageTokens-parameter);
  }
  .token.variable,
  .token.function {
    color: var(--chakra-colors-languageTokens-function);
  }
  .token.operator {
    color: var(--chakra-colors-languageTokens-operator);
  }
  .token.url {
    color: var(--chakra-colors-languageTokens-link);
  }
  /* HTML overrides */
  .token.attr-value > .token.punctuation.attr-equals,
  .token.special-attr > .token.attr-value > .token.value.css {
    color: var(--chakra-colors-languageTokens-variable);
  }
  /* CSS overrides */
  .language-css .token.selector {
    color: var(--chakra-colors-languageTokens-builtin);
  }
  .language-css .token.property {
    color: var(--chakra-colors-languageTokens-property);
  }
  .language-css .token.function,
  .language-css .token.url > .token.function {
    color: var(--chakra-colors-languageTokens-link);
  }
  .language-css .token.url > .token.string.url {
    color: var(--chakra-colors-languageTokens-string);
  }
  .language-css .token.important,
  .language-css .token.atrule .token.rule {
    color: var(--chakra-colors-languageTokens-keyword);
  }
  /* JS overrides */
  .language-javascript .token.operator {
    color: var(--chakra-colors-languageTokens-operator);
  }
  .language-javascript
    .token.template-string
    > .token.interpolation
    > .token.interpolation-punctuation.punctuation {
    color: var(--chakra-colors-languageTokens-punctuation);
  }
  /* JSON overrides */
  .language-json .token.operator {
    color: var(--chakra-colors-languageTokens-operator);
  }
  .language-json .token.null.keyword {
    color: var(--chakra-colors-languageTokens-builtin);
  }
  /* MD overrides */
  .language-markdown .token.url,
  .language-markdown .token.url > .token.operator,
  .language-markdown .token.url-reference.url > .token.string {
    color: var(--chakra-colors-languageTokens-link);
  }
  .language-markdown .token.url > .token.content {
    color: var(--chakra-colors-languageTokens-link);
  }
  .language-markdown .token.url > .token.url,
  .language-markdown .token.url-reference.url {
    color: var(--chakra-colors-languageTokens-link);
  }
  .language-markdown .token.blockquote.punctuation,
  .language-markdown .token.hr.punctuation {
    color: var(--chakra-colors-languageTokens-punctuation);
    font-style: italic;
  }
  .language-markdown .token.code-snippet {
    color: var(--chakra-colors-languageTokens-string);
  }
  .language-markdown .token.bold .token.content {
    color: var(--chakra-colors-languageTokens-constant);
  }
  .language-markdown .token.italic .token.content {
    color: var(--chakra-colors-languageTokens-keyword);
  }
  .language-markdown .token.strike .token.content,
  .language-markdown .token.strike .token.punctuation,
  .language-markdown .token.list.punctuation,
  .language-markdown .token.title.important > .token.punctuation {
    color: var(--chakra-colors-languageTokens-builtin);
  }
  /* General */
  .token.bold {
    font-weight: bold;
  }
  .token.comment,
  .token.italic {
    font-style: italic;
  }
  .token.entity {
    cursor: help;
  }
  .token.namespace {
    opacity: 0.8;
  }
  /* Plugin overrides */
  /* Selectors should have higher specificity than those in the plugins' default stylesheets */
  /* Show Invisibles plugin overrides */
  .token.token.tab:not(:empty):before,
  .token.token.cr:before,
  .token.token.lf:before,
  .token.token.space:before {
    color: hsla(220, 14%, 71%, 0.15);
    text-shadow: none;
  }
  /* Toolbar plugin overrides */
  /* Space out all buttons and move them away from the right edge of the code block */
  div.code-toolbar > .toolbar.toolbar > .toolbar-item {
    margin-right: 0.4em;
  }
  /* Styling the buttons */
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span {
    background: var(--chakra-colors-editor-bg);
    color: var(--chakra-colors-editor-fg);
    padding: 0.1em 0.4em;
    border-radius: 0.3em;
  }
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > button:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > a:focus,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:hover,
  div.code-toolbar > .toolbar.toolbar > .toolbar-item > span:focus {
    background: var(--chakra-colors-editor-bg);
    color: var(--chakra-colors-editor-fg);
  }
  /* Line Highlight plugin overrides */
  /* The highlighted line itself */
  .line-highlight.line-highlight {
    background: hsla(220, 100%, 80%, 0.04);
  }
  /* Default line numbers in Line Highlight plugin */
  .line-highlight.line-highlight:before,
  .line-highlight.line-highlight[data-end]:after {
    background: var(--chakra-colors-editor-bg);
    color: var(--chakra-colors-editor-fg);
    padding: 0.1em 0.6em;
    border-radius: 0.3em;
    box-shadow: 0 2px 0 0 rgba(0, 0, 0, 0.2); /* same as Toolbar plugin default */
  }
  /* Hovering over a linkable line number (in the gutter area) */
  /* Requires Line Numbers plugin as well */
  pre[id].linkable-line-numbers.linkable-line-numbers
    span.line-numbers-rows
    > span:hover:before {
    background-color: hsla(220, 100%, 80%, 0.04);
  }
  /* Line Numbers and Command Line plugins overrides */
  /* Line separating gutter from coding area */
  .line-numbers.line-numbers .line-numbers-rows,
  .command-line .command-line-prompt {
    border-right-color: hsla(220, 14%, 71%, 0.15);
  }
  /* Stuff in the gutter */
  .line-numbers .line-numbers-rows > span:before,
  .command-line .command-line-prompt > span:before {
    color: var(--chakra-colors-languageTokens-comment);
  }
  /* Match Braces plugin overrides */
  /* Note: Outline colour is inherited from the braces */
  .rainbow-braces .token.token.punctuation.brace-level-1,
  .rainbow-braces .token.token.punctuation.brace-level-5,
  .rainbow-braces .token.token.punctuation.brace-level-9 {
    color: var(--chakra-colors-languageTokens-punctuation);
  }
  .rainbow-braces .token.token.punctuation.brace-level-2,
  .rainbow-braces .token.token.punctuation.brace-level-6,
  .rainbow-braces .token.token.punctuation.brace-level-10 {
    color: var(--chakra-colors-languageTokens-type);
  }
  .rainbow-braces .token.token.punctuation.brace-level-3,
  .rainbow-braces .token.token.punctuation.brace-level-7,
  .rainbow-braces .token.token.punctuation.brace-level-11 {
    color: var(--chakra-colors-languageTokens-builtin);
  }
  .rainbow-braces .token.token.punctuation.brace-level-4,
  .rainbow-braces .token.token.punctuation.brace-level-8,
  .rainbow-braces .token.token.punctuation.brace-level-12 {
    color: var(--chakra-colors-languageTokens-string);
  }
  /* Diff Highlight plugin overrides */
  /* Taken from https://github.com/atom/github/blob/master/styles/variables.less */
  pre.diff-highlight > code .token.token.deleted:not(.prefix),
  pre > code.diff-highlight .token.token.deleted:not(.prefix) {
    background-color: hsla(353, 100%, 66%, 0.15);
  }
  pre.diff-highlight > code .token.token.deleted:not(.prefix)::-moz-selection,
  pre.diff-highlight > code .token.token.deleted:not(.prefix) *::-moz-selection,
  pre > code.diff-highlight .token.token.deleted:not(.prefix)::-moz-selection,
  pre
    > code.diff-highlight
    .token.token.deleted:not(.prefix)
    *::-moz-selection {
    background-color: hsla(353, 95%, 66%, 0.25);
  }
  pre.diff-highlight > code .token.token.deleted:not(.prefix)::selection,
  pre.diff-highlight > code .token.token.deleted:not(.prefix) *::selection,
  pre > code.diff-highlight .token.token.deleted:not(.prefix)::selection,
  pre > code.diff-highlight .token.token.deleted:not(.prefix) *::selection {
    background-color: hsla(353, 95%, 66%, 0.25);
  }
  pre.diff-highlight > code .token.token.inserted:not(.prefix),
  pre > code.diff-highlight .token.token.inserted:not(.prefix) {
    background-color: hsla(137, 100%, 55%, 0.15);
  }
  pre.diff-highlight > code .token.token.inserted:not(.prefix)::-moz-selection,
  pre.diff-highlight
    > code
    .token.token.inserted:not(.prefix)
    *::-moz-selection,
  pre > code.diff-highlight .token.token.inserted:not(.prefix)::-moz-selection,
  pre
    > code.diff-highlight
    .token.token.inserted:not(.prefix)
    *::-moz-selection {
    background-color: hsla(135, 73%, 55%, 0.25);
  }
  pre.diff-highlight > code .token.token.inserted:not(.prefix)::selection,
  pre.diff-highlight > code .token.token.inserted:not(.prefix) *::selection,
  pre > code.diff-highlight .token.token.inserted:not(.prefix)::selection,
  pre > code.diff-highlight .token.token.inserted:not(.prefix) *::selection {
    background-color: hsla(135, 73%, 55%, 0.25);
  }
  /* Previewers plugin overrides */
  /* Based on https://github.com/atom-community/atom-ide-datatip/blob/master/styles/atom-ide-datatips.less and https://github.com/atom/atom/blob/master/packages/one-dark-ui */
  /* Border around popup */
  .prism-previewer.prism-previewer:before,
  .prism-previewer-gradient.prism-previewer-gradient div {
    border-color: hsl(224, 13%, 17%);
  }
  /* Angle and time should remain as circles and are hence not included */
  .prism-previewer-color.prism-previewer-color:before,
  .prism-previewer-gradient.prism-previewer-gradient div,
  .prism-previewer-easing.prism-previewer-easing:before {
    border-radius: 0.3em;
  }
  /* Triangles pointing to the code */
  .prism-previewer.prism-previewer:after {
    border-top-color: hsl(224, 13%, 17%);
  }
  .prism-previewer-flipped.prism-previewer-flipped.after {
    border-bottom-color: hsl(224, 13%, 17%);
  }
  /* Background colour within the popup */
  .prism-previewer-angle.prism-previewer-angle:before,
  .prism-previewer-time.prism-previewer-time:before,
  .prism-previewer-easing.prism-previewer-easing {
    background: var(--chakra-colors-editor-bg);
  }
  /* For angle, this is the positive area (eg. 90deg will display one quadrant in this colour) */
  /* For time, this is the alternate colour */
  .prism-previewer-angle.prism-previewer-angle circle,
  .prism-previewer-time.prism-previewer-time circle {
    stroke: var(--chakra-colors-editor-fg);
    stroke-opacity: 1;
  }
  /* Stroke colours of the handle, direction point, and vector itself */
  .prism-previewer-easing.prism-previewer-easing circle,
  .prism-previewer-easing.prism-previewer-easing path,
  .prism-previewer-easing.prism-previewer-easing line {
    stroke: var(--chakra-colors-editor-fg);
  }
  /* Fill colour of the handle */
  .prism-previewer-easing.prism-previewer-easing circle {
    fill: transparent;
  }
`
