import React from 'react'

const Button = ({isActive, handleButtonActivate, titleButton, whoIs}) => {
    return (
        <button
            onClick={() => handleButtonActivate(whoIs)}
            className={isActive ? "option-button selected" : 'option-button'}
        >
            {titleButton}
        </button>
    )
}

export default Button