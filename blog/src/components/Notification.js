import { Alert } from '@material-ui/lab'

const Notification = ( { message } ) => {
  if ( message === null ) {
    return null
  }

  return (
        <Alert style={{marginBottom: 30}} severity={message.type}>
          {message.content}
        </Alert>
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