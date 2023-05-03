import {
  Container,
  Flex,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

export default function NotesSkeleton() {
  return (
    <Container flex={1} px={4} py={32}>
      <Container maxW="1024px" mx="auto">
        <Flex direction="column" align="stretch" gap={12}>
          <Flex align="center" justify="space-between">
            <Skeleton
              startColor="slate.600"
              endColor="slate.700"
              height="36px"
              width="128px"
            />
            <Flex align="center" gap={6}>
              <Skeleton
                startColor="slate.600"
                endColor="slate.700"
                height="24px"
                width="128px"
              />
              <Skeleton
                startColor="slate.600"
                endColor="slate.700"
                height="24px"
                width="48px"
              />
              <Flex align="center" gap={2}>
                <Skeleton
                  startColor="slate.600"
                  endColor="slate.700"
                  height="36px"
                  width="36px"
                />
                <Skeleton
                  startColor="slate.600"
                  endColor="slate.700"
                  height="36px"
                  width="36px"
                />
              </Flex>
            </Flex>
          </Flex>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Tags</Th>
                  <Th>Edited</Th>
                </Tr>
              </Thead>
              <Tbody>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton
                        startColor="slate.600"
                        endColor="slate.700"
                        height="24px"
                      />
                    </Td>
                    <Td>
                      <Skeleton
                        startColor="slate.600"
                        endColor="slate.700"
                        height="24px"
                      />
                    </Td>
                    <Td>
                      <Skeleton
                        startColor="slate.600"
                        endColor="slate.700"
                        height="24px"
                      />
                    </Td>
                    <Td>
                      <Skeleton
                        startColor="slate.600"
                        endColor="slate.700"
                        height="24px"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Container>
    </Container>
  )
}
