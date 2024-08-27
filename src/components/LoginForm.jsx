import { useState } from "react"
import "./LoginForm.css"

const LoginForm = ({ image, theme, loginHandler, registerHandler }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [registerError, setRegisterError] = useState('')

  const handleEmailChange = (event) => setEmail(event.target.value)
  const handlePasswordChange = (event) => setPassword(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNewEmailChange = (event) => setNewEmail(event.target.value)
  const handleNewPasswordChange = (event) => setNewPassword(event.target.value)

  const login = async (event) => {
    event.preventDefault()
    const credentials = {
      email,
      password
    }

    const errorObj = await loginHandler(credentials)
    if (!errorObj.error) {
      setEmail('')
      setPassword('')
      setNewName('')
      setNewEmail('')
      setNewPassword('')
      setLoginError('')
      setRegisterError('')
    } else {
      setLoginError(errorObj.error)
      setRegisterError('')
    }

  }

  const register = async (event) => {
    event.preventDefault()
    const credentials = {
      name: newName,
      email: newEmail,
      password: newPassword
    }

    const errorObj = await registerHandler(credentials)
    if (!errorObj.error) {
      setEmail('')
      setPassword('')
      setNewName('')
      setNewEmail('')
      setNewPassword('')
      setLoginError('')
      setRegisterError('')
    } else {
      setRegisterError(errorObj.error)
      setLoginError('')
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
              onChange={handleEmailChange} required />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password}
              onChange={handlePasswordChange} required />
          </div>
          
          <p className="error-message">{loginError}</p>

          <button type="submit">Login</button>
        </form>

        <h2>Register</h2>
        <form onSubmit={register} id="register-form">
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={newName}
              onChange={handleNameChange} required />
          </div>
          <div>
            <label htmlFor="new-email">Email</label>
            <input type="email" id="new-email" value={newEmail}
              onChange={handleNewEmailChange} required />
          </div>

          <div>
            <label htmlFor="new-password">Password</label>
            <input type="password" id="new-password" value={newPassword}
              onChange={handleNewPasswordChange} required />
          </div>
            <p className="error-message">{registerError}</p>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm