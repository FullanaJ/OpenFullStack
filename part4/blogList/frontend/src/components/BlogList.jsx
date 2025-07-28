const BlogList = ({list}) => {
    console.log("blogs in list:",list)
    return list.lenght === 0 ? <></>
    :
    (
        <div>
            {list.map(blog => 
                <>
                <h3>{blog.title}</h3>
                <p>Made by <b>{blog.author}</b></p>
                <p>{blog.url}</p>
                <p>&#10084; {blog.likes}</p>
                </>
            )}
        </div>
    )
}

export default BlogList