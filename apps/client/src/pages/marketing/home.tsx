import { Button } from '@/components/ui'

export default function HomePage() {
  return (
    <div className="container pt-[200px]">
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-heading text-6xl font-bold">
            Changes the way a developer
          </h2>
          <h1 className="font-heading text-primary text-8xl font-bold">
            writes markdown
          </h1>
        </div>
        <div className="flex items-center gap-8">
          <Button size="lg">Try now</Button>
          <Button variant="outline" size="lg">
            Github
          </Button>
        </div>
      </div>
    </div>
  )
}
