const BlogForm = ({ onSubmit, onTitleChange, onAuthorChange, onUrlChange, onLikesChange }) => {

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="ftitle">Title</label> <br />
                <input onChange={onTitleChange} type="text" id="ftitle" name="ftitle"></input>
                <br />
                <label htmlFor="fauthor">Author</label> <br />
                <input onChange={onAuthorChange} type="text" id="fauthor" name="fauthor"></input>
                <br />
                <label htmlFor="furl">Url</label> <br />
                <input onChange={onUrlChange} type="text" id="furl" name="furl"></input>
                <br />
                <label htmlFor="flikes">Likes</label> <br />
                <input onChange={onLikesChange} type="number" id="flikes" name="flikes"></input>
                <br />
                <br />
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default BlogForm

/*
 <form>
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname">
</form> 

title: String,
  author: String,
  url: String,
  likes: Number
*/