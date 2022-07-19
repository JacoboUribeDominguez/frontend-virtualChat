import React, { useState } from 'react'
import Context from './Context';

const ContextProvider = ({ children }) => {

    const [optionSelected, setOptionSelected] = useState(0);

    const [severitySelected, setSeveritySelected] = useState(0);

    const [information, setInformation] = useState(0);
    const [informationLoading, setInformationLoading] = useState(true);

    return (
        <Context.Provider value={
            {
                optionSelected,
                information,
                informationLoading,
                severitySelected,
                setOptionSelected,
                setInformation,
                setInformationLoading,
                setSeveritySelected
            }
        }>
            { children }
        </Context.Provider>
    )
}

export default ContextProvider