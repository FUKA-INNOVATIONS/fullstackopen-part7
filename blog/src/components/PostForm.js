import React, { useState } from 'react'
import Proptypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'


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
      <TextField
        label={'Title'}
        id={'titleInput'}
        type={'text'}
        onChange={handleTitleChange}
        value={newTitle}
      />

      <TextField
        label={'Author'}
        id={'authorInput'}
        type={'text'}
        onChange={handleAuthorChange}
        value={ newAuthor }
        style={marginLeft}
      />


      <TextField
        label={'Website'}
        id={'urlInput'}
        type={'text'}
        onChange={handleUrlChange}
        value={ newUrl }
        style={marginLeft}
      />
      <Button id={'savePost'} type="submit" variant={'contained'} color={'secondary'}>save</Button>
      <br />


    </form>
  )
}

PostForm.propTypes = {
  createPost: Proptypes.func.isRequired
}

const marginLeft = {
  marginLeft: 20
}

export default PostForm