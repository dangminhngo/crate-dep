import { Container } from '~/components/primitive'
import { styled } from '~/stitches.config'

export default function FeaturesPage() {
  return (
    <StyledFeaturesPage>
      {' '}
      <Container className="container">Featuress</Container>
    </StyledFeaturesPage>
  )
}

const StyledFeaturesPage = styled('div', {})
