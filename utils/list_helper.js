const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

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

const users = [
  {
    _id: "623a10f7713601171c6a89e8",
    username: "Arjun",
    name: "Arjun R",
    passwordHash: "$2b$10$R9blt.T2vq1p77HLuKybweN98L6DNOLJyDPqBbPdkznw5V536jLdi",
    __v: 0
  },
  {
    _id: "623a1132713601171c6a89ec",
    username: "Ronaldo",
    name: "Cristiano Ronaldo",
    passwordHash: "$2b$10$P5uOYhP1X0mR0a.cdZ20q.i8RUbpwSX1Wd56fhmN5DC1aT1frKt4i",
    __v: 0
  }
]

module.exports = {
  blogs,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  users
}