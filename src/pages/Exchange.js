import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import InputCurrency from '../components/InputCurrency'
import { labels } from '../constants'
import { getFormattedDate, localStorageGet } from '../utils'
import Accordion from '../components/Accordion'
import AppContext from '../AppContext'
import { AppActions } from '../StateReducer'

const ExchangePage = () => {
    const { dispatch } = useContext(AppContext)
    const [rates, setRates] = useState({})
    const [lastUpdatedRates, setLastUpdatedRates] = useState(localStorageGet('uyuAppState').lastUpdatedRates || 'Cargando...')
    const [blue, setBlue] = useState(localStorageGet('uyuAppState').lastBlueValue || '')
    const [currency, setCurrency] = useState(localStorageGet('uyuAppState').lastSelectedCurrency || 'UYU')
    const [error, setError] = useState(null)
    

    const handleBlueChanges = (e) => {
        setBlue(e.target.value)
        dispatch({ type: AppActions.SAVE_BLUE, payload: e.target.value })
    }

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        dispatch({ type: AppActions.SAVE_LAST_CURRENCY, payload: e.target.value })
    }

    const shouldFetchData = () => {
        return localStorageGet('uyuAppState').lastSavedRates === null ||
            localStorageGet('uyuAppState').lastUpdatedRates === null ||
            new Date().getTime() / 1000 > localStorageGet('uyuAppState').nextUpdate
    }

    const getRates = async () => {
        try {
            if (shouldFetchData()) {
                const { data } = await axios.get(`${process.env.REACT_APP_EXCHANGE_RATE_API_BASE_URL}${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/USD`)
                const { conversion_rates, time_last_update_unix, time_next_update_unix } = data
                const { ARS, UYU, ILS, EUR, CLP, BRL } = conversion_rates
                setRates({ ARS, UYU, ILS, EUR, CLP, BRL })
                setLastUpdatedRates(time_last_update_unix)
                setError(null)

                dispatch({ type: AppActions.SET_LAST_UPDATED_RATES, payload: time_last_update_unix })
                dispatch({ type: AppActions.SET_NEXT_UPDATE_DATE, payload: time_next_update_unix })
                dispatch({
                    type: AppActions.SET_LAST_SAVED_RATES,
                    payload: {
                        ARS,
                        UYU,
                        ILS,
                        EUR,
                        CLP,
                        BRL 
                    }
                })
            } else {
                setRates(localStorageGet('uyuAppState').lastSavedRates)
                setLastUpdatedRates(localStorageGet('uyuAppState').lastUpdatedRates)
            }
        } catch (error) {
            setError(error)
            if (error.code === 'ERR_BAD_REQUEST') {
                setRates(localStorageGet('uyuAppState').lastSavedRates)
            }
            console.log(error)
        }
    }

    const fullRates = { ...rates, ARS_BLUE: blue, USD: 1 }

    useEffect(() => {
        getRates()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="exchange-wrapper">
            <Accordion>
                <div className="exchange-input">
                    <input
                        type="number"
                        value={blue}
                        placeholder="Dólar Blue"
                        onChange={handleBlueChanges}
                    />
                </div>
            </Accordion>
            <div className="divider" />
            <select
                className="exchange-selector"
                value={currency}
                onChange={handleCurrencyChange}
            >
                {Object.keys(fullRates).map((item) => (
                    <option key={item} value={item}>{labels[item]}</option>
                ))}
            </select>
            <div className="exchange-last-info">Última cotización: {getFormattedDate(lastUpdatedRates)}</div>
            {error && <div className="exchange-error">Hubo un error descargando la última cotización de las divisas, por lo que se utilizará la última cotización obtenida</div>}
            <InputCurrency
                label={currency}
                rates={fullRates}
            />
        </div>
    )
}

export default ExchangePage