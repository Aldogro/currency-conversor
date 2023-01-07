import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InputCurrency from '../components/InputCurrency'
import { labels } from '../constants'

const ExchangePage = () => {
    const [rates, setRates] = useState({})
    const [blue, setBlue] = useState(localStorage.getItem('blueValue') || '')
    const [currency, setCurrency] = useState(localStorage.getItem('selectedCurrency') || 'UYU')

    const updateBlue = (e) => {
        setBlue(e.target.value)
        localStorage.setItem('blueValue', e.target.value)
    }

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        localStorage.setItem('selectedCurrency', e.target.value)
    }

    const getRates = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_EXCHANGE_RATE_API_BASE_URL}${process.env.REACT_APP_EXCHANGE_RATE_API_KEY}/latest/USD`)
        const { conversion_rates } = data
        const { ARS, UYU, ILS } = conversion_rates
        setRates({ ARS, UYU, ILS })
    }

    const fullRates = { ...rates, ARS_BLUE: blue, USD: 1 }

    useEffect(() => {
        getRates()
    }, [])

    return (
        <div className="exchange-wrapper">
            <div className="exchange-input">
                <label htmlFor="ARS_BLUE">Dolar Blue Hoy</label>
                <input
                    type="number"
                    id="ARS_BLUE"
                    value={blue}
                    onChange={updateBlue}
                />
            </div>

            <select
                className="exchange-selector"
                value={currency}
                onChange={handleCurrencyChange}
            >
                {Object.keys(fullRates).map((item) => (
                    <option key={item} value={item}>{labels[item]}</option>
                ))}
            </select>
            
            <InputCurrency
                label={currency}
                rates={fullRates}
            />
        </div>
    )
}

export default ExchangePage