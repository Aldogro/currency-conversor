import { useState } from 'react'
import { labels } from '../constants'


const InputCurrency = ({ label, rates }) => {
    const [value, setValue] = useState(0)

    const ratesKeys = Object.keys(rates)

    const conversions = {}
    ratesKeys.map((rate) => (
        conversions[rate] = (
            ratesKeys.map(_rate => {
                return {
                    label: _rate,
                    value: (value / rates[rate]) * rates[_rate]
                }
            })
        )
    ))

    return (
        <div className="input-currency-wrapper">
            <div className="input-currency-input">
                <input
                    type="number"
                    name={label}
                    id={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="input-currency-conversions">
                {conversions[label] && conversions[label].map((item) => (
                    label !== item.label &&
                    <div key={item.label} className="input-currency-card">
                        <div className="input-currency-card-label">{labels[item.label]}</div>
                        <div className="input-currency-card-value">{item.value.toFixed(2)}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InputCurrency