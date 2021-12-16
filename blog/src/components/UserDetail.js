import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getUsers } from '../reducers/userReducer'
import { useEffect } from 'react'

const UserDetail = props => {
  const dispatch = useDispatch()
  const params = useParams()
  const userId = params.id

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const getUserById = (userId, users) => {
    return users.filter(user => user.id === userId)
  }

  const posts = useSelector(state => state.posts)
  const userPosts = posts.filter(p => p.user.id === userId)
  //console.log(userPosts)


  const user = useSelector(state => state.user)


  // Todella haastavaa ja huono toteutustapa, keksitään myöhemmin oikean ratkaisun (async await?)
  if (user && userId) {
    const users = user.users
    if(users) {
      const user = users.find(u => u.id === userId)
      //console.log(user)
    }

  }

  if(!user) {
    return null
  }

  return (
      <div>
        <p>User details:</p>
        <h3>{user.name}</h3>
        <b>Added blogs ({userPosts.length})</b>

        <ul>
        {userPosts.length > 0 &&
          userPosts.map(post => <li key={post.id}><a href={`/posts/${post.id}`}>{post.title}</a> </li>)
          }
        </ul>
      </div>
  )
}

export default UserDetail