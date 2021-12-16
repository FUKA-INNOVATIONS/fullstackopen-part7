import userService from '../services/userService'

const userReducer = (state = null, action) => {
  switch ( action.type ) {
    case 'SET_USER':
      return action.data
    case 'GET_ALL':
      //console.log('users in action', action.data)
      return { ...state, users: action.data }
    default:
      return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const getUsers = () => {
  //console.log('getUsers called')
  return async dispatch => {
    const users = await userService.getAll()
    //console.log('users in getUsers', users)
    dispatch({
      type: 'GET_ALL',
      data: users
    })
  }
}


export default userReducer