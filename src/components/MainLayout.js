import React, { useContext } from 'react'
import dolaruco from '../assets/dolaruco.png'
import AuthContext from '../AuthContext'

const MainLayout = ({ children }) => {
    const { status, logout } = useContext(AuthContext)

    return (
        <div className="main-layout">
            <header className="main-layout-header">
                <img src={dolaruco} className="logo" alt="logo" />
            </header>
            {status &&
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