import React, { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('')

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      await props.blogService.create({
        title, author, url
      })
      props.setNotifMessage([`${title} by ${author} added`, 'success'])
      setTimeout(() => props.setNotifMessage(['', null]), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogs(props.blogs.concat({id: props.blogs.length + 1, title, author, url, likes: 0}))
    } catch (exception) {
      props.setNotifMessage(['blog could not be created', 'error'])
      setTimeout(() => props.setNotifMessage(['', null]), 5000)
    }
  }

  return (
    <>
      <h1>create new</h1>
        <div>
          title
          <input type="text" name="title" value={title} onChange={({ target }) => setTitle(target.value)}/>
         </div> 
        <div>
          author
          <input type="text" name="title" value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
          url
          <input type="text" name="title" value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type="submit" onClick={submitBlog}>Sumbit</button>
    </>
  )
}

export default BlogForm