import { Container } from '@/components/primitive'
import { styled } from '@/stitches.config'

export default function SupportPage() {
  return (
    <StyledSupportPage>
      {' '}
      <Container className="container">Support</Container>
    </StyledSupportPage>
  )
}

const StyledSupportPage = styled('div', {})
