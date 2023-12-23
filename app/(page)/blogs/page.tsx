'use client'
import React, { useEffect, useState } from 'react'
import { getLatestBlogs } from '@/app/actions/airtable'
import { Section } from '@/components'
import BlogCard from './BlogCard'
import Grid from '@mui/material/Grid';

const Route = () => {
  const [blogs, setBlogs] = useState<DB.Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getLatestBlogs({limit: 20})
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  return (
    <div className="max-w-4xl md:max-w-6xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-48 md:pt-32">
      <Section title="Blogs" >
          {blogs.map((blog, index) => (
            <Grid container className="mb-5" key={index}>
                <BlogCard blog={blog} index={index} />
            </Grid>
          ))}
      </Section>
    </div>
  )
}

export default Route