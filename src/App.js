import { useReducer } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routing from './routes/Routing'
import AppContext from './AppContext'
import MainLayout from './components/MainLayout'
import { AppReducer } from './StateReducer'
import { localStorageGet } from './utils'

const App = () => {
  const lastSavedState = localStorageGet('uyuAppState')

  const initialState = {
    loggedUser: false,
    lastBlueValue: '',
    lastSelectedCurrency: '',
    lastSavedRates: '',
    lastUpdatedRates: '',
    nextUpdate: ''
  }

  const [appState, dispatch] = useReducer(AppReducer, lastSavedState ?? initialState)

  return (
    <AppContext.Provider value={{ appState, dispatch }}>
      <MainLayout>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </MainLayout>
    </AppContext.Provider>
  )
}

export default App
