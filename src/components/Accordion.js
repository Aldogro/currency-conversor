import React, { useState } from 'react'

const Accordion = ({ children }) => {
    const [toggle, setToggle] = useState(false)
    const toggleAccordion = () => {
        setToggle(!toggle)
    }

    return (
        <div className="accordion-wrapper">
            <div className={`accordion-header ${toggle && 'open'}`} onClick={toggleAccordion}>
                Dólar blue hoy
            </div>
            <div className={`accordion-body ${!toggle && 'closed'}`}>
                {children}
            </div>
        </div>
    )
}

export default Accordion