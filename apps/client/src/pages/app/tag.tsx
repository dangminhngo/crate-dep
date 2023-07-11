import { Suspense, lazy } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import TagFormDialog from '~/components/dialogs/tag-form-dialog'
import { Delete, FilterAlt, Label, Sort } from '~/components/icons'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Container,
  Flex,
  Icon,
} from '~/components/primitive'
import IconButton from '~/components/shared/icon-button'
import SectionSkeleton from '~/components/skeletons/section-skeleton'
import { useDeleteTagById, useTagById } from '~/hooks'
import { styled } from '~/stitches.config'

const NoteList = lazy(() => import('~/components/note-list'))

export default function TagPage() {
  const params = useParams()
  const navigate = useNavigate()
  const { status, data: tag } = useTagById(params.id as string)
  const { mutate: deleteTag } = useDeleteTagById({
    onSuccess: () => {
      navigate('/app/tags')
    },
  })

  if (status === 'loading') return <SectionSkeleton />

  if (status === 'error') return <div>There was an error</div>

  return (
    <StyledTagPage>
      <Container className="container">
        <div className="titlebar">
          <div className="titlebar__left">
            <h3 style={{ color: tag.color ?? '$slate200' }}>
              <Icon size="xl" as={Label} />
              {tag.title}
              <TagFormDialog tag={tag} />
            </h3>
          </div>
          <div className="titlebar__right">
            <span>Last edited Apr 28</span>
            <span>{tag.notes.length} notes</span>
            <div className="buttons">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <IconButton
                    variant="destructive"
                    tooltip="Delete permanently"
                  >
                    <Icon as={Delete} />
                  </IconButton>
                </AlertDialogTrigger>
                <AlertDialogPortal>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this tag.
                      </AlertDialogDescription>
                      <Flex css={{ justifyContent: 'flex-end', gap: '$2' }}>
                        <AlertDialogCancel>
                          <Button variant="outline">Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction asChild>
                          <Button
                            variant="destructive"
                            onClick={() => deleteTag(tag.id)}
                          >
                            Yes, delete
                          </Button>
                        </AlertDialogAction>
                      </Flex>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialogPortal>
              </AlertDialog>
              <IconButton tooltip="Filter">
                <Icon as={FilterAlt} />
              </IconButton>
              <IconButton tooltip="Sort">
                <Icon as={Sort} />
              </IconButton>
            </div>
          </div>
        </div>
        {tag.notes.length > 0 ? (
          <Suspense fallback={<SectionSkeleton />}>
            <NoteList notes={tag.notes} />
          </Suspense>
        ) : (
          <p className="message">You have no notes with tag "{tag.title}"</p>
        )}
      </Container>
    </StyledTagPage>
  )
}

const StyledTagPage = styled('div', {
  flex: 1,
  px: '$6',

  '.container': {
    maxW: '$lg',
    py: '$48',
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
