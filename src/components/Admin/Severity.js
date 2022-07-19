import React, { useCallback, useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Context from '../../context/Context';

const Severity = () => {

    const {
        optionSelected,
        severitySelected,
        setSeveritySelected
    } = useContext(Context);

    const [severities, setSeverities] = useState([]);

    const [newSeverityName, setNewSeverityName] = useState('');
    const [newSeverityColor, setNewSeverityColor] = useState('#a8a8a8');

    const getSeverities = useCallback(async () => {
        let res = await fetch(`${process.env.REACT_APP_API}severities/getSeverities`, {
            method: 'POST',
            body: JSON.stringify({
                admin: localStorage.getItem('id_user'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        setSeverities(data.data);
    }, [])

    const addSeverity = async () => {
        if (newSeverityName.length > 0) {
            const res = await fetch(`${process.env.REACT_APP_API}severities/addSeverity`, {
                method: 'POST',
                body: JSON.stringify({
                    name: newSeverityName,
                    color: newSeverityColor,
                    id_user: localStorage.getItem('id_user'),
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            if (data.data && data.data !== null) {
                setSeverities([
                    ...severities,
                    data.data
                ])
            }
            setNewSeverityName('')
            setNewSeverityColor('#a8a8a8')
        }
    }

    const handleClickSeverity = async (severity) => {
        await fetch(`${process.env.REACT_APP_API}options-support/changeSeverity`, {
            method: 'PUT',
            body: JSON.stringify({
                id_severity: severity.id_severity,
                id_option_support: optionSelected,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        setSeveritySelected(severity.id_severity);
    }

    useEffect(() => {
        getSeverities()
    }, [getSeverities])

    return (
        <div>
            <h3
                className="severity-title"
            >
                Severity
            </h3>
            <div className="severities-container">
                {
                    severities.map(severity => (
                        <div
                            key={severity.id_severity}
                            className="severity"
                            onClick={() => handleClickSeverity(severity)}
                            style={
                                {
                                    backgroundColor: severity.color,
                                    border: (severity.id_severity === severitySelected) ? '2px solid #4ACBEE' : 'none'
                                }
                            }
                        >
                            {severity.name}
                        </div>
                    ))
                }
                <div className="add-severity-container">
                    <div
                        className="add-severity"
                    >
                        <input type="text" value={newSeverityName} placeholder="Add" onChange={(e) => setNewSeverityName(e.target.value)} />
                        <FontAwesomeIcon onClick={addSeverity} icon={faPlus} />
                    </div>
                    <input type="color" value={newSeverityColor} onChange={(e) => setNewSeverityColor(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default Severity