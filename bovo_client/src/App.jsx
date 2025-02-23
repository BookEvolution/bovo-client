import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginLayout from './layout/loginLayout/LoginLayout'
import Login from './pages/login/Login'
import SignUpLayout from './layout/signUpLayout/SignUpLayout'
import SignUpStep1 from './pages/signUpStep1/SignUpStep1'
import SignUpStep2 from './pages/signUpStep2/SignUpStep2'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginLayout />}>
            <Route index element={<Login />}/>
          </Route>
          <Route path='/sign-up' element={<SignUpLayout />}>
            <Route path='/sign-up/step1' element={<SignUpStep1 />} />
            <Route path='/sign-up/step2' element={<SignUpStep2 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
