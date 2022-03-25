import React, { useState, useEffect } from 'react'
const Blog = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
    <div style={hideWhenVisible}>
    <p>{props.blog.title} {props.blog.author}<button onClick={toggleVisibility}>View</button></p>
    </div>
    <div style={showWhenVisible}>
      <p>{props.blog.title}<button onClick={toggleVisibility}>Cancel</button></p>
      <p>{props.blog.author}</p>
      <p>{props.blog.url}</p>
      <p>{props.blog.likes}</p>
      <button onClick={props.deleteBlog} data-title={props.blog.title}>Remove</button>
    </div>
  </div>
  )
}

export default Blog