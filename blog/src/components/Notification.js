const Notification = ( { message } ) => {
  if ( message === null ) {
    return null
  }

  return (
      // eslint-disable-next-line react/react-in-jsx-scope
      <div style={ message.type === 'error' ? errorStyle : successStyle }>
        { message.content }
      </div>
  )
}


const successStyle = {
  color: 'green',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
}

const errorStyle = {
  color: 'red',
  fontSize: 20,
  borderStyle: 'solid',
  padding: 10,
}

export  { Notification }