import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import ProtectedRoutes from './ProtectedRoutes'
import AppContext from '../AppContext'
import LoginPage from '../pages/Login'
import ExchangePage from '../pages/Exchange'
import HomePage from '../pages/Home'

const Routing = () => {
    const { appState } = useContext(AppContext);

    return (
        <Routes>
            <Route path={routes.HOME} element={<HomePage />}/>
            <Route
                path={routes.EXCHANGE}
                element={
                    <ProtectedRoutes user={appState.loggedUser}>
                        <ExchangePage />
                    </ProtectedRoutes>
                }
            />
            <Route path={routes.LOGIN} element={<LoginPage />} />
            <Route path="*" element={<div>no nos quedó de eso...</div>} />
        </Routes>
    )
}

export default Routing
