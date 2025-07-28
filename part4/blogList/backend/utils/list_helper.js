//const Blog = require('../models/blog')
const dummy = (blogs) => {
  return 1
}
/**
 * 
 * @param {Blog[]} blogs 
 */
const totalLikes = (blogs) => {
  return blogs.length === 0 ? 0 :
    blogs.reduce((total, blog) => total + blog.likes, 0)
}
/**
 * 
 * @param {Blog[]} blogs 
 */
const favoriteBlog = (blogs) => {
  if (blogs.length === 0)
    return null
  const blog = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max)
  return {
    'title': blog.title,
    'author': blog.author,
    'likes': blog.likes
  }
}

/**
 * 
 * @param {Blog[]} blogs 
 */
const mostBlogs = (blogs) => {
  return Object.values(blogs.reduce((acc, blog) => {
    const key = blog.author
    if (!acc[key]) {
      acc[key] = {
        author: key,
        blogs: 1
      }
    } else
      acc[key].blogs += 1
    return acc
  }, {})).reduce((last, b) => {
    if (last.blogs < b.blogs)
      last = b
    return last
  }, { blogs: 0 })
}
/**
 * 
 * @param {Blog[]} blogs 
 */
const mostLikes = (blogs) => {
  return Object.values(blogs.reduce((acc, blog) => {
    const key = blog.author
    if (!acc[key]) 
      acc[key] = {
        author: key,
        likes: 0
      }
      acc[key].likes += blog.likes
    return acc
  }, {})).reduce((last, b) => {
    if (last.likes < b.likes)
      last = b
    return last
  }, { likes: 0 })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}