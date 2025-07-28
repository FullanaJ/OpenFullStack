import { useState, useEffect } from 'react'
import BlogForm from './components/Blogform'
import BlogList from './components/BlogList'
import BlogREST from './service/BlogREST'


function App() {
  const [blogs, setBlogs] = useState([])
  const [title,settitle] = useState('')
  const [author,setauthor] = useState('')
  const [url,seturl] = useState('')
  const [likes,setlikes] = useState(0)
    

  const getBlogs = () => {
    BlogREST.getAll().then((res) => {
      console.log("getBdData:", res)
      console.log("data.data", res.data)
      setBlogs(res.data)
    })
  }

  const createBlog = () => {
    const newblog = {
      title:title,
      author:author,
      url:url,
      likes:likes
    }
    console.log("new blog:",newblog)
    BlogREST.create(newblog).then((response) => {
      console.log(response)
      getBlogs()
    })
  }
  const handleOnTitleChange = (event) => {
    settitle(event.target.value)
  }
  const handleOnAuthorChange = (event) => {
    setauthor(event.target.value)
  }
  const handleOnUrlChange = (event) => {
    seturl(event.target.value)
  }
  const handleOnLikesChange = (event) => {
    setlikes(event.target.value)
  }

  
  const handleOnSubmit = (event) => {
        event.preventDefault()
        createBlog()
      //
  }
  console.log("blogs:",blogs)

  useEffect(() => getBlogs(), [])
  
  return (
    <>
    {console.log("blogs:",blogs)}
      <h1>Blog</h1>
      <div>
        <BlogForm onSubmit={handleOnSubmit} onTitleChange={handleOnTitleChange}
          onAuthorChange={handleOnAuthorChange} onUrlChange={handleOnUrlChange}
          onLikesChange={handleOnLikesChange}
        />
      </div>
      <BlogList list={blogs} />
    </>
  )
}

export default App
