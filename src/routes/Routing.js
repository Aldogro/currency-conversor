import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import ProtectedRoutes from './ProtectedRoutes'
import AuthContext from '../AuthContext'
import LoginPage from '../pages/Login'
import ExchangePage from '../pages/Exchange'
import HomePage from '../pages/Home'

const Routing = () => {
    const { status } = useContext(AuthContext);

    return (
        <Routes>
            <Route path={routes.HOME} element={<HomePage />}/>
            <Route
                path={routes.EXCHANGE}
                element={
                    <ProtectedRoutes user={status}>
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
