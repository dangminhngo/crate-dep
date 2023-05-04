import { ArrowUpDown, Tag } from 'lucide-react'

import TagsSkeleton from '@/components/skeletons/tags-skeleton'
import TagList from '@/components/tag-list'
import { Icon, IconButton } from '@/components/ui'
import { useTagList } from '@/hooks'

export default function TagsPage() {
  const { status, data: tags } = useTagList()

  if (status === 'loading') return <TagsSkeleton />

  if (status === 'error') return <div>There was an error</div>

  return (
    <div className="container flex flex-col items-stretch gap-12 py-48">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-3xl font-bold">
          <Icon size="xl" as={Tag} />
          Tags
        </h3>
        <div className="flex items-center gap-6">
          <span className="text-slate-400">Last edited Apr 28</span>
          <span className="text-slate-400">{tags.length} tags</span>
          <div className="flex items-center gap-2">
            <IconButton variant="ghost" size="sm" tooltip="Sort">
              <Icon as={ArrowUpDown} />
            </IconButton>
          </div>
        </div>
      </div>
      {tags.length > 0 ? <TagList tags={tags} /> : <p>You have no tags</p>}
    </div>
  )
}
