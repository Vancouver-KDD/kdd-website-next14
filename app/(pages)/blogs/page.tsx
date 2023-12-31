import React, {Suspense} from 'react'
import {getLatestBlogs} from '@/actions/airtable'
import {Section} from '@/components'
import BlogCard from './BlogCard'
import Grid from '@mui/material/Grid'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Blogs 블로그',
}
export default function BlogsPage() {
  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
      <Section title="Blogs">
        <Suspense fallback={<div>Loading...</div>}>
          <Blogs />
        </Suspense>
      </Section>
    </div>
  )
}

async function Blogs() {
  const blogs = await getLatestBlogs({ limit: 20 })
  
  console.log('블로그',blogs)

  return blogs.map((blog, index) => (
    <Grid container className="mb-5" key={blog.id}>
      <BlogCard blog={blog} index={index} />
    </Grid>
  ))
}
