import React from 'react'
import {getLatestBlogs} from '@/actions/airtable'
import {Section} from '@/components'
import BlogCard from './BlogCard'
import Grid from '@mui/material/Grid'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Blogs 블로그',
}
export default async function BlogsPage() {
  const blogs = await getLatestBlogs({limit: 20})

  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
      <Section title="Blogs">
        {blogs.map((blog, index) => (
          <Grid container className="mb-5" key={blog.id}>
            <BlogCard blog={blog} index={index} />
          </Grid>
        ))}
      </Section>
    </div>
  )
}
