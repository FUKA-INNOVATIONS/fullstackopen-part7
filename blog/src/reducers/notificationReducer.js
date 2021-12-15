const notificationReducer = (state = [], action) => {
  switch ( action.type ) {
    case 'CREATE_MESSAGE':
      return [action.data]
    case 'RESET':
      return []
    default:
      return state
  }
}

export const createMessage = (message) => {
  return {
    type: 'CREATE_MESSAGE',
    data: { message }
  }
}

export const resetMessage = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer