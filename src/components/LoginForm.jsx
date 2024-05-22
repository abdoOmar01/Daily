import { useState } from "react"
import "./LoginForm.css"

const LoginForm = ({ image, theme, loginHandler, registerHandler }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNewEmailChange = (event) => setNewEmail(event.target.value)
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value)

  const login = (event) => {
    event.preventDefault()
    const credentials = {
      email,
      password
    }

    if (loginHandler(credentials)) {
      setEmail('')
      setPassword('')
    }
  }

  const register = (event) => {
    event.preventDefault()
    const credentials = {
      name: newName,
      email: newEmail,
      password: newPassword
    }

    if (registerHandler(credentials)) {
      setNewName('')
      setNewEmail('')
      setNewPassword('')
    }
  }

  return (
    <div data-theme={theme} id="login-page">
      <div id="logo-banner">
        <img src={image} alt="Daily logo" />
      </div>

      <div id="forms-container">
        <h2>Login</h2>
        <form onSubmit={login} id="login-form">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email}
              onChange={handleEmailChange} />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password}
              onChange={handlePasswordChange} />
          </div>

          <button type="submit">Login</button>
        </form>

        <h2>Register</h2>
        <form onSubmit={register} id="register-form">
          <div>
          <label htmlFor="name">Name</label>
            <input type="text" id="name" value={newName}
              onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="new-email">Email</label>
            <input type="email" id="new-email" value={newEmail}
              onChange={handleNewEmailChange} />
          </div>

          <div>
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" value={newPassword}
              onChange={handleNewPasswordChange} />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm