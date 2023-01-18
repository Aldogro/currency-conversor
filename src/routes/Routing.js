import { useContext, Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'
import ProtectedRoutes from './ProtectedRoutes'
import AppContext from '../AppContext'
import NavBar from './NavBar'

const HomePage = lazy(() => import('../pages/Home'))
const LoginPage = lazy(() => import('../pages/Login'))
const ExchangePage = lazy(() => import('../pages/Exchange'))
const MapsPage = lazy(() => import('../pages/Maps'))

const Routing = () => {
    const { appState } = useContext(AppContext)

    return (
        <>
            <NavBar />
            <Suspense fallback={<div>Cargando...</div>}>
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
                    <Route
                        path={routes.MAPS}
                        element={
                            <ProtectedRoutes user={appState.loggedUser}>
                                <MapsPage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route path={routes.LOGIN} element={<LoginPage />} />
                    <Route path="*" element={<div>no nos quedó de eso...</div>} />
                </Routes>
            </Suspense>
        </>
    )
}

export default Routing
