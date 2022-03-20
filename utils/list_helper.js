const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  
  let mostLikes = blogs[0];
  blogs.forEach(blog => {
    if (mostLikes.likes < blog.likes) {
      mostLikes = blog;
    }
  });
  
  return { title: mostLikes.title, author: mostLikes.author, likes: mostLikes.likes }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  
  let tracker = {};
  blogs.forEach(blog => {
    if (tracker[blog['author']]) {
      tracker[blog['author']]++;
    } else {
      tracker[blog['author']] = 1;
    }
  });

  let authors = Object.keys(tracker);
  let mostBlogsAuth = authors[0]
  authors.forEach(author => {
    if (tracker[author] > tracker[mostBlogsAuth]) {
      mostBlogsAuth = author
    }
  })

  return { author: mostBlogsAuth, blogs: tracker[mostBlogsAuth] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  let tracker = {};
  blogs.forEach(blog => {
    if (tracker[blog.author]) {
      tracker[blog.author] += blog.likes
    } else {
      tracker[blog.author] = blog.likes
    }
  })

  let authors = Object.keys(tracker)
  let mostLikesAuth = authors[0]
  authors.forEach(author => {
    if (tracker[author] > tracker[mostLikesAuth]) {
      mostLikesAuth = author
    }
  })

  return { author: mostLikesAuth, likes: tracker[mostLikesAuth] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}