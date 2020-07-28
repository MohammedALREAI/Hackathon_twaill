import React, { useState, useContext } from 'react'
import MainLayout from '../layouts/main'
import { doPost } from '../lib/fetch'
import { inputChangeHandler } from '../lib/eventHandlers'
import FormAlert from '../components/FormAlert'
import { AuthContext } from '../providers/Auth'
import Container from '../components/global/Container'
import FormLabel from '../components/global/FormLable'
import Input from '../components/global/Input'
import Button from '../components/global/Button'


const Login = ({ location, history }) => {
  const classes = useStyles()
  const { login } = useContext(AuthContext)

  const defaultState = {
    username: '',
    password: ''
  }
  const [loginState, setLoginState] = useState(defaultState)
  const [formResponse, setFormResponse] = useState({
    title: '',
    message: '',
    type: 'success'
  })
  const [showAlert, setShowAlert] = useState(false)

  const handleInput = (event) => {
    inputChangeHandler(event, [loginState, setLoginState])
  }

  const submitForm = async (event) => {
    // await api call for login
    const resp = await doPost('/api/auth/login', JSON.stringify(loginState), false)
    // handle errors

    const result = await resp.json()
    if (!resp.ok) {
      await setFormResponse({
        type: 'error',
        title: 'Error',
        message: `${result.message}`
      })
    } else {
      login(await result)
      if (location.state && location.state.referrer) {
        history.push(location.state.referrer)
      } else {
        history.push('/dashboard')
      }
    }
    setShowAlert(true)
  }

  return (
    <MainLayout>
         <h1 className="text-4xl mb-4">Login page</h1>
         <div>
              <FormAlert
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                    alertTitle={formResponse.title}
                    alertType={formResponse.type}
                    alertMessage={formResponse.message}
              />
         </div>

      <Container>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
               <div class="my-4">
        <FormLabel forInput="username" textInput="Username" />
        <Input
          name="username"
          type="text"
          styling=""
          onChange={handleInput}
          value={loginState.username}
        />
        </div>
     <div class="my-4">

        <FormLabel forInput="password" textInput="Password" />
        <Input
          name="password"
          type="password"
          styling=""
          onChange={handleInput}
          value={loginState.password}
        />
        </div>
        <Button onClick={onClick} textButton="login"  name="login" onClick={submitForm}/>
        </form>
        </Container>
        </MainLayout>)
}

export default Login
