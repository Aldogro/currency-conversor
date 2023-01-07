import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../AuthContext'
import { routes } from '../routes/routes'

const LoginPage = () => {
    const navigate = useNavigate()
    const { status, login } = useContext(AuthContext)
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const onSubmit = () => {
        const res = login(user, pass)
        if (res) {
            navigate(routes.EXCHANGE)
        }
        setUser('')
        setPass('')
    }

    useEffect(() => {
        if (status) {
            navigate(routes.EXCHANGE)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="login-wrapper">
            <div className="login-header">
                LOGIN
            </div>
            <form onSubmit={onSubmit}>
                <div className="login-body">
                    <div className="login-item">
                        <input
                            type="text"
                            id="username"
                            placeholder="Usuario"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>

                    <div className="login-item">
                        <input
                            type="password"
                            id="password"
                            placeholder="Contraseña"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>

                    <button type="submit">Ingresar</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage