import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AppContext from '../AppContext'
import { routes } from '../routes/routes'

const HomePage = () => {
    const { appState } = useContext(AppContext)
    
    return <Navigate to={appState.loggedUser ? routes.EXCHANGE : routes.LOGIN} />
}

export default HomePage
