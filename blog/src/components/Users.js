import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/userReducer'
import { useEffect } from 'react';

const Users = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector(state => state.user.users)
  console.log('users inUsers', users)

  if(users) {
    return (
        <div>
          <h3>Users ({ users.length })</h3>
          {users.map(user =>
            <p key={user.username}>{ user.name } has  { user.posts.length > 0 ? user.posts.length : 'no' } posts</p>
          )}
        </div>
    )
  }
}

export default Users