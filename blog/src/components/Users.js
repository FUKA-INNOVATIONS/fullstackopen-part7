import { useDispatch, useSelector } from 'react-redux'
import { Route, useParams } from 'react-router-dom'
import { getUsers } from '../reducers/userReducer'
import { useEffect } from 'react'



const UsersAll = ({ users }) => {
  if(users) {
    return (
        <div>

          <h3>Users ({ users.length })</h3>
          {users.map(user =>
              <p key={user.username}><a href={`users/${user.id}`}>{ user.name }</a> has  { user.posts.length > 0 ? user.posts.length : 'no' } posts</p>
          )}
        </div>
    )
  } else {
    return null
  }
}


const Users = props => {
  const dispatch = useDispatch()
  const params = useParams()
  const userId = params.id
  //console.log('userId', userId)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])



  const users = useSelector(state => state.user.users)
  //console.log('users inUsers', users)

    return (
        users ? <UsersAll users={users} /> : null
    )



}

export default Users