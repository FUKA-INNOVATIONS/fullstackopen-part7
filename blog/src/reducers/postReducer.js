const postReducer = (state = [], action) => {
  switch ( action.type ) {
    case 'INIT_POSTS':
      return action.data
    case 'ADD_POST':
      return [...state, action.data]
    default:
      return state
  }
}

export const initPosts = (initialPosts) => {
  return {
    type: 'INIT_POSTS',
    data: initialPosts
  }
}

export const addNewPost = (post) => {
  return {
    type: 'ADD_POST',
    data: post
  }
}


export default postReducer