const listHelper = require('../utils/list_helper')


test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the like of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(listHelper.blogs)
    expect(result).toBe(36)
  })
})


describe('favorite blog', () => {
  test ('many blogs', () => {
    const result = listHelper.favoriteBlog(listHelper.blogs)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    })
  })

  test('empty list, return null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBe(null)
  })

  test('2 blogs with same likes, return first', () => {
    const sameLikes = [{
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    }]

    let result = listHelper.favoriteBlog(sameLikes);

    expect(result).toEqual({
      title: "React patterns",
      author: "Michael Chan",
      likes: 5,
    })
  })
})

describe('most blogs', () => {
  test('multiple blogs', () => {
    expect(listHelper.mostBlogs(listHelper.blogs)).toEqual({ author: "Robert C. Martin", blogs: 3 })
  })

  test('empty blogs list', () => {
    expect(listHelper.mostBlogs([])).toEqual(null)
  })

  test('many top bloggers', () => {
    let blogs = [
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
        author: "Michael Chan",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      } 
    ]

    let result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author: 'Michael Chan', blogs: 2 })
  })
})

describe('most likes', () => {
  test('empty array, return null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('many blogs', () => {
    expect(listHelper.mostLikes(listHelper.blogs)).toEqual({ author: "Edsger W. Dijkstra", likes: 17 })
  })
})

