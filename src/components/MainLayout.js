import React, { useContext } from 'react'
import dolaruco from '../assets/dolaruco.png'
import AppContext from '../AppContext'
import { AppActions } from '../StateReducer'

const MainLayout = ({ children }) => {
    const { appState, dispatch } = useContext(AppContext)

    const logout = () => {
        dispatch({ type: AppActions.LOGOUT })
    }

    return (
        <div className="main-layout">
            <header className="main-layout-header">
                <img src={dolaruco} className="logo" alt="logo" />
            </header>
            {appState.loggedUser &&
                <button className="main-layout-logout" onClick={logout}>
                    X
                </button>
            }
            <div className="main-layout-body">
                {children}
            </div>
        </div>
    )
}

export default MainLayout