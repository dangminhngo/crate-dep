import { useState } from 'react'
import { useCreateNote, useUpdateNoteById } from '~/hooks'
import type { RouterOutputs } from '~/lib/trpc'
import { styled } from '~/stitches.config'

import { AddBox, Clear, Pen } from '../icons'
import {
  Button,
  Dialog,
  DialogClose,
  DialogCloseButton,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Flex,
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  useToast,
} from '../primitive'
import IconButton from '../shared/icon-button'

export default function NoteFormDialog({
  note,
}: {
  note?: RouterOutputs['note']['byId']
}) {
  const { toast } = useToast()
  const editing = !!note
  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState(note?.title ?? '')
  const [description, setDescription] = useState(note?.description ?? '')
  const { mutate: updateNote } = useUpdateNoteById({
    onSuccess: () => {
      toast({
        title: `Note Updated`,
        description: `A note has been updated`,
      })
    },
  })
  const { mutate: createNote } = useCreateNote({
    onSuccess: () => {
      toast({
        title: `Note Added`,
        description: `A new note has been added`,
      })
    },
  })

  const handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setTitle(e.target.value)
  const handleDescriptionChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => setDescription(e.target.value)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    if (editing) {
      updateNote({ id: note.id, data: { title, description } })
    } else {
      createNote({ title, description })
    }
    setVisible(false)
  }

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      <DialogTrigger asChild>
        {editing ? (
          <IconButton size="sm" tooltip="Edit">
            <Icon as={Pen} />
          </IconButton>
        ) : (
          <IconButton tooltip="New">
            <Icon as={AddBox} />
          </IconButton>
        )}
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{editing ? 'Edit note' : 'Create note'}</DialogTitle>
          <StyledNoteFormContainer>
            <Form onSubmit={handleSubmit}>
              <FormField name="title">
                <Flex
                  css={{
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormLabel>Title</FormLabel>
                  <FormMessage match="valueMissing">
                    Please enter at least one character
                  </FormMessage>
                </Flex>
                <FormControl asChild onChange={handleTitleChange} value={title}>
                  <Input type="text" required />
                </FormControl>
              </FormField>
              <FormField name="description">
                <Flex
                  css={{
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                  }}
                >
                  <FormLabel>Description</FormLabel>
                  <FormMessage match="valueMissing">
                    Please enter at least one character
                  </FormMessage>
                </Flex>
                <FormControl
                  asChild
                  onChange={handleDescriptionChange}
                  value={description}
                >
                  <Input type="text" required />
                </FormControl>
              </FormField>
              <div className="buttons">
                <Button type="submit">Save</Button>
                <DialogClose asChild>
                  <Button variant="outline">Dismiss</Button>
                </DialogClose>
              </div>
            </Form>
          </StyledNoteFormContainer>
          <DialogCloseButton>
            <Icon as={Clear} />
          </DialogCloseButton>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

const StyledNoteFormContainer = styled('div', {
  mt: '$8',
  fontSize: '$sm',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '$6',

  '.buttons': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '$4',
  },
})
