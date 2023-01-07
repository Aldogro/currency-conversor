import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routing from './routes/Routing'
import AuthContext from './AuthContext'
import MainLayout from './components/MainLayout'

const App = () => {
  const isLogged = localStorage.getItem('userLogin')
  const [authStatus, setAuthStatus] = useState(['RojasGrimbegIn'].includes(isLogged))

  const login = (user, pass) => {
    if (user === process.env.REACT_APP_USERNAME && pass === process.env.REACT_APP_PASSWORD) {
      setAuthStatus(true)
      localStorage.setItem('userLogin', 'RojasGrimbegIn')
      return true
    }
    setAuthStatus(false)
    return false
  }

  const logout = () => {
    setAuthStatus(false)
    localStorage.removeItem('userLogin')
  }

  return (
    <AuthContext.Provider value={{ status: authStatus, login, logout }}>
      <MainLayout>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </MainLayout>
    </AuthContext.Provider>
  );
}

export default App
