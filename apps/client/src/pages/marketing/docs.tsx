import { Container } from '@/components/primitive'
import { styled } from '@/stitches.config'

export default function DocsPage() {
  return (
    <StyledDocsPage>
      {' '}
      <Container className="container">Docs</Container>
    </StyledDocsPage>
  )
}

const StyledDocsPage = styled('div', {})
