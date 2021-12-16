import React, { useState } from 'react'
import Proptypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('') ; setPassword('')
  }

  return (
    <>
      <h3>Log in to application</h3>
      <form onSubmit={handleSubmit}>
          <div>
            <TextField label={'Username'} id={'username'} value={username} onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            <TextField label={'Password'} type={'password'} id={'password'} value={password} onChange={({ target }) => setPassword(target.value)} />
          </div>
          <div>
            <Button style={{marginTop: 20}} variant="outlined" color="secondary" type="submit">
              login
            </Button>

          </div>
      </form>
    </>
  )

}

LoginForm.propTypes = {
  handleLogin: Proptypes.func.isRequired
}

export default LoginForm