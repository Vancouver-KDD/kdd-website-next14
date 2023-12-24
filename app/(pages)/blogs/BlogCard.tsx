import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import {DateTime} from 'luxon'
import Link from 'next/link'

export default function BlogCard({blog, index}: {blog: DB.Blog; index: number}) {
  const formattedDescription = blog.description
    .split(/(\d{4}\.\d{2}\.\d{2})/)
    .reduce((acc, line, index) => {
      if (index === 2) {
        acc[1] += ' ' + line
      } else {
        acc.push(line)
      }
      return acc
    }, [] as string[])
    .map((line, index) => <p key={index}>{line}</p>)

  return (
    <Card className="w-full h-full md:h-[200px] flex flex-col md:flex-row items-center gap-4">
      <div>
        <CardMedia
          className="w-full md:w-[240px] h-[200px]"
          image={`https://source.unsplash.com/random/?technology,coding&${index}`}
        />
      </div>
      <div className="flex flex-col gap-4 p-4 w-full">
        <div className="font-semibold text-lg py-2">{blog.title}</div>
        <Link href={blog.url} target="_blank">
          <div className="h-[70px] overflow-y-auto">{formattedDescription}</div>
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {DateTime.fromISO(blog.date).toFormat('LLL dd')} ·{stringToTime(blog.description)} min
            read · By <span className="font-medium">{blog.author?.name || 'Vancouver KDD'}</span>
          </div>
          <div className="mr-4">
            <Link href={blog.url} target="_blank">
              <Button size="medium">Read More</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

function stringToTime(text: string | void) {
  if (!text) {
    return 0
  }
  const words = text.length / 5.7 // 4.7 avg characters per word + space
  const minutes = words / 120 // 120 average words per minute
  return Math.ceil(minutes)
}
