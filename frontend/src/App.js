import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

  const blogForm = () => (
    <Togglable buttonLabel="add blog">
      <BlogForm blogService={blogService} setBlogs={setBlogs} blogs={blogs} setNotifMessage={setNotifMessage}/>
    </Togglable>
  )
  
  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()
    const users = await blogService.getAll()
    const title = event.target.getAttribute('data-title')
    const blog = users.find((blog) => blog.title === title)
    const confirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (!confirmation) return 

    const userId = blog.id
    await blogService.deleteBlog(userId)
    setBlogs(blogs.filter(blog => blog.id !== userId))
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  },[])

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
            {blogForm()}
            {blogs.sort((a,b) => a.likes > b.likes).map(blog =>
              <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
            )}
          </div>}
    </div>
  )
}

export default App