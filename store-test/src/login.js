import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const navigate = useNavigate()

  const logIn = () => {
    fetch('http://3.23.235.218:8010/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((r) => r.json())
      .then((r) => {
        if (r) {
          localStorage.setItem('user', JSON.stringify({ email, token: r.token }))
          props.setLoggedIn(true)
          props.setEmail(email)
          console.log(r);
          
          //navigate('/')
        } else {
          console.log("Algo ha salido mal.");
        }
      })
  }

  const onButtonClick = () => {
    if ('' === email) {
      setEmailError('Ingrese usuario')
      return
    }

    if ('' === password) {
      setPasswordError('Ingrese contrasena')
      return
    }

    logIn();
  }

  return (
    <div className={'mainContainer'}>
      <div className={'containerBlock'}>
        <div className={'inputContainer'}>
          <input
            value={email}
            placeholder="Usuario"
            onChange={(ev) => setEmail(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={password}
            placeholder="Contrasena"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Iniciar Sesion'} />
        </div>
      </div>
      
    </div>
  )
}

export default Login