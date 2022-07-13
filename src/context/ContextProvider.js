import React, { useState } from 'react'
import Context from './Context';

const ContextProvider = ({ children }) => {

    const [optionSelected, setOptionSelected] = useState(0);

    return (
        <Context.Provider value={{optionSelected, setOptionSelected}}>
            { children }
        </Context.Provider>
    )
}

export default ContextProvider