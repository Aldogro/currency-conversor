import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputCurrency from '../components/InputCurrency'
import { labels } from '../constants'
import { getFormattedDate } from '../utils'
import Accordion from '../components/Accordion'

const ExchangePage = () => {
    const [rates, setRates] = useState({})
    const [lastUpdatedRates, setLastUpdatedRates] = useState(localStorage.getItem('lastUpdatedRates') || 'Cargando...')
    const [blue, setBlue] = useState(localStorage.getItem('blueValue') || '')
    const [currency, setCurrency] = useState(localStorage.getItem('selectedCurrency') || 'UYU')
    const [error, setError] = useState(null)

    const handleBlueChanges = (e) => {
        setBlue(e.target.value)
        localStorage.setItem('blueValue', e.target.value)
    }

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        localStorage.setItem('selectedCurrency', e.target.value)
    }

    const shouldFetchData = () => {
        return localStorage.getItem('lastSavedRates') === null ||
            localStorage.getItem('lastUpdatedRates') === null ||
            new Date().getTime() / 1000 > localStorage.getItem('nextUpdate')
    }

    const getRates = async () => {
        try {
            console.log(
                shouldFetchData(),
                localStorage.getItem('lastSavedRates') === null,
                localStorage.getItem('lastUpdatedRates') === null,
                new Date().getTime() / 1000 > localStorage.getItem('nextUpdate'),
                new Date().getTime() / 1000,
                localStorage.getItem('nextUpdate')
            )
            if (shouldFetchData()) {
                const { data } = await axios.get(`${process.env.REACT_APP_EXCHANGE_RATE_API_BASE_URL}${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/USD`)
                const { conversion_rates, time_last_update_unix, time_next_update_unix } = data
                const { ARS, UYU, ILS, EUR, CLP, BRL } = conversion_rates
                setRates({ ARS, UYU, ILS, EUR, CLP, BRL })
                setLastUpdatedRates(time_last_update_unix)
                setError(null)
                localStorage.setItem(
                    'lastUpdatedRates',
                    time_last_update_unix
                )
                localStorage.setItem(
                    'nextUpdate',
                    time_next_update_unix
                )
                localStorage.setItem(
                    'lastSavedRates',
                    JSON.stringify({
                        ARS,
                        UYU,
                        ILS,
                        EUR,
                        CLP,
                        BRL 
                    })
                )
            } else {
                setRates(JSON.parse(localStorage.getItem('lastSavedRates')))
                setLastUpdatedRates(localStorage.getItem('lastUpdatedRates'))
            }
        } catch (error) {
            setError(error)
            if (error.code === 'ERR_BAD_REQUEST') {
                setRates(JSON.parse(localStorage.getItem('lastSavedRates')))
            }
            console.log(error)
        }
    }

    const fullRates = { ...rates, ARS_BLUE: blue, USD: 1 }

    useEffect(() => {
        getRates()
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