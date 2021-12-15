import React, { useState } from 'react'
import Proptypes from 'prop-types'


const PostForm = ({ createPost }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newPost, setNewPost] = useState({})


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
    setNewPost({ ...newPost, title: event.target.value })
  }
  const handleAuthorChange = event => {
    // eslint-disable-next-line no-undef
    setNewAuthor(event.target.value)
    setNewPost({ ...newPost, author: event.target.value })
  }

  const handleUrlChange = event => {
    setNewUrl(event.target.value)
    setNewPost({ ...newPost, url: event.target.value })
  }

  const addPost = (event) => {
    event.preventDefault()
    createPost(newPost)
    setNewTitle(''); setNewAuthor(''); setNewUrl('')
    setNewPost({})
  }

  return (
    <form onSubmit={addPost}>
      <label htmlFor="title">Title:</label><br />
      <input
        id={'titleInput'}
        type={'text'}
        onChange={handleTitleChange}
        value={newTitle}
      />
      <br />

      <label htmlFor="author">Author:</label><br />
      <input
        id={'authorInput'}
        type={'text'}
        onChange={handleAuthorChange}
        value={ newAuthor }
      />
      <br />

      <label htmlFor="url">Url:</label><br />
      <input
        id={'urlInput'}
        type={'text'}
        onChange={handleUrlChange}
        value={ newUrl }
      />
      <br />

      <button id={'savePost'} type="submit">save</button>
    </form>
  )
}

PostForm.propTypes = {
  createPost: Proptypes.func.isRequired
}

export default PostForm