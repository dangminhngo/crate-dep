import { styled } from '~/stitches.config'

import { Container, Skeleton, Table } from '../primitive'

export default function SectionSkeleton() {
  return (
    <StyledSectionSkeleton>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3>
              <Skeleton
                css={{
                  h: '$8',
                  w: '$8',
                }}
              />
              <Skeleton
                css={{
                  h: '$8',
                  w: '$20',
                }}
              />
            </h3>
          </div>
          <div className="titlebar__right">
            <Skeleton />
            <Skeleton />
            <div className="buttons">
              <Skeleton
                css={{
                  h: '$9',
                  w: '$9',
                }}
              />
              <Skeleton
                css={{
                  h: '$9',
                  w: '$9',
                }}
              />
            </div>
          </div>
        </div>
        <Table>
          <thead>
            <tr>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
            </tr>
            <tr>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
            </tr>
            <tr>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
            </tr>
            <tr>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
              <th>
                <Skeleton />
              </th>
            </tr>
          </tbody>
        </Table>
      </Container>
    </StyledSectionSkeleton>
  )
}

const StyledSectionSkeleton = styled('div', {
  flex: 1,
  px: '$6',
  py: '$48',

  '.container': {
    maxW: '$lg',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '$8',
  },

  '.titlebar': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  '.titlebar__left': {
    '& h3': {
      display: 'flex',
      alignItems: 'center',
      fontSize: '$2xl',
      gap: '$2',
    },
  },

  '.titlebar__right': {
    display: 'flex',
    alignItems: 'center',
    gap: '$6',
    '& span': {
      color: '$slate400',
    },
  },

  '.titlebar__right .buttons': {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',
  },

  '.message': {
    textAlign: 'center',
  },
})
