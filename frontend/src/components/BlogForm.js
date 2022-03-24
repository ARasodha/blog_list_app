import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('')

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      console.log('blog created response', response)
    } catch (exception) {
      console.log('blog could not be created')
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