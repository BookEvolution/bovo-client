import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LoginLayout from './layout/loginLayout/LoginLayout'
import Login from './pages/login/Login'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginLayout />}>
            <Route index element={<Login />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
