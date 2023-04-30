export interface Tag {
  id: string
  title: string
  notes: Note[]
  createdAt: string
  updatedAt: string
}

export interface Directory {
  id: string
  title: string
  description: string
  color: string
  notes: Note[]
  createdAt: string
  updatedAt: string
}

export interface Note {
  id: string
  title: string
  description: string
  body: string
  tags: Tag[]
  starred: boolean
  directory: string
  trashed: boolean
  createdAt: string
  updatedAt: string
}
