import { useState } from 'react'
import { labels } from '../constants'


const InputCurrency = ({ label, rates }) => {
    const [value, setValue] = useState('')

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
                    value={value}
                    placeholder="Monto"
                    min="0"
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div className="input-currency-conversions">
                {conversions[label] && conversions[label].map((item) => (
                    label !== item.label &&
                    <div key={item.label} className="input-currency-card">
                        <div className="input-currency-card-label">
                            <b>{labels[item.label]}</b>
                            {item.label !== 'USD' &&
                                <div className="input-currency-card-label-small">
                                    1 USD = {Number(rates[item.label]).toFixed(2)}
                                </div>
                            }
                        </div>
                        <div className="input-currency-card-value">
                            <b>{item.value.toFixed(2)}</b>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default InputCurrency