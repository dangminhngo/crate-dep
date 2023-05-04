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
    <div>
      <ReactMarkdown
        rehypePlugins={[rehypeCodeTitles, rehypePrism, rehypeSlug]}
        remarkPlugins={[remarkGfm]}
      >
        {code}
      </ReactMarkdown>
    </div>
  )
}
