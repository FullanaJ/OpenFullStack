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

const mostBlogs = (blogs) => {

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}