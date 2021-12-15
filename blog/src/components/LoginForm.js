import React, { useState } from 'react'
import Proptypes from 'prop-types'


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
        <>
            Username <br />
          <input
            id={'username'}
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </>
        <div>
            Password<br />
          <input
            id={'password'}
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id={'login-btn'} type="submit">login</button>
      </form>
    </>
  )

}

LoginForm.propTypes = {
  handleLogin: Proptypes.func.isRequired
}

export default LoginForm