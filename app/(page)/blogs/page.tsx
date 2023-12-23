'use client'
import React, { useEffect, useState } from 'react'
import { getLatestBlogs } from '@/app/actions/airtable'
import { Section } from '@/components'

const Route = () => {
  const [blogs, setBlogs] = useState<DB.Blog[]>([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await getLatestBlogs({limit: 20})
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  console.log('브ㄹ로그', blogs)

  return (
    <div className="max-w-4xl md:max-w-5xl flex flex-col justify-center items-center gap-8 m-auto p-4 pt-56">
      <Section title="Blogs" className="text-center">
        {blogs.map((blog) => (
            <div className="">
            <p className=" text-gray-800 text-xl font-bold">
              {blog.title ?? ''}
            </p>
            <p className="line-clamp-4 text-gray-500 text-base my-2">
              {blog.description ?? ''}
            </p>
            </div>
        ))}
      </Section>
    </div>
  )
}

export default Route