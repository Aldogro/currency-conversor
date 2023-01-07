import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../AuthContext'
import { routes } from '../routes/routes'

const HomePage = () => {
    const { status } = useContext(AuthContext)
    
    return <Navigate to={status ? routes.EXCHANGE : routes.LOGIN} />
}

export default HomePage
