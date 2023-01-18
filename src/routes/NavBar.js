import React from 'react'
import { NavLink } from 'react-router-dom'
import { routes } from './routes'

const NavBar = () => {
    return (
        <div className="navbar-wrapper">
            <NavLink
                to={routes.EXCHANGE}
                className={({ isActive }) => isActive ? 'navbar-link-active' : undefined}
            >
                Exchange
            </NavLink>
            <NavLink
                to={routes.MAPS}
                className={({ isActive }) => isActive ? 'navbar-link-active' : undefined}
            >
                Mapa
            </NavLink>
        </div>
    )
}

export default NavBar