import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUsers } from '../reducers/userReducer'
import React, { useEffect } from 'react'
import { Button } from '@material-ui/core'

const SinglePost = ({ likePost }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const postId = params.id
  //console.log(postId)

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const handleLike = async (postId, currentLikes) => {
    await likePost(postId, currentLikes)
  }

  const posts = useSelector(state => state.posts)

  let post


  // Todella haastavaa ja huono toteutustapa, keksitään myöhemmin oikean ratkaisun (async await?)
  if (posts && postId) {
    if(posts) {
      post = posts.find(p => p.id === postId)
    }
  }

  if(!post) {
    return null
  }

  return (
      <div>
        <br />
        <h3>{post.title}</h3>
        <a href={ `http://${post.url}` }>{`http://${post.url}`}</a>
        <p>
          {post.likes} likes
          <Button variant={'outlined'} color={'secondary'} id={'likeBtn'} style={marginLeft} onClick={() => handleLike(post.id, post.likes)}>Like</Button>
        </p>
        <p>added by {post.author}</p>

        <ul>

        </ul>
      </div>
  )
}
const marginLeft = {
  marginLeft: 20
}

export default SinglePost