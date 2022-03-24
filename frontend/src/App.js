import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
// import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message[1] === 'error') {
    return (
      <div>
      <h1>{message[0]}</h1>
    </div>
    )
  }

  return (
    <div>
      <h1>{message[0]}</h1>
    </div>
  )
}

const BlogForm = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('')

  const submitBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title, author, url
      })
      props.setNotifMessage([`${title} by ${author} added`, 'success'])
      setTimeout(() => props.setNotifMessage(['', null]), 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
      props.setBlogs(props.blogs.concat({id: props.blogs.length + 1, title, author, url}))
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

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notifMessage, setNotifMessage] = useState(['', null])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMessage(['wrong credentials', 'error'])
      setTimeout(() => setNotifMessage(['', null]), 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <Notification message={notifMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
  
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      {user === null ? 
        loginForm() :
         <div>     
           <h2>blogs</h2>
           <Notification message={notifMessage}/>
           <p>{user.name} is logged in <button onClick={handleLogOut}>logout</button></p> 
           <BlogForm setBlogs={setBlogs} blogs={blogs} setNotifMessage={setNotifMessage}/>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>}
    </div>
  )
}

export default App