import { faArrowRightFromBracket, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Topic = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [information, setInformation] = useState('No hay información');

    const getInformation = async () => {
        console.log(state)
        const res = await fetch(`${process.env.REACT_APP_API}information/getInformationByOption`, {
            method: 'POST',
            body: JSON.stringify({
                id_option_support: state.id_option,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        console.log(data.data)
        if(data.data[0]){
            setInformation(data.data[0].description)
        }
    }
    useEffect(() => {
        getInformation()
        if (!localStorage.getItem('id_user')) {
            navigate('/')
        }
    }, [navigate, getInformation, state])
    return (
        <div className="topic-container">
            <div className="header-container">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </div>
            <div className="topic-body">
                <div className="start-new-conversation-container">
                    <button
                        onClick={() => navigate('/topic/chat', { state: { id_admin: state.id_admin, name: state.name, color: state.color } })}
                        className="btn-start-new-conversation"
                    >
                        Start a new conversation
                        <FontAwesomeIcon icon={faComment} />
                    </button>
                </div>
                <h3>{state.name}</h3>
                <div>
                    { information }
                </div>
            </div>
        </div>
    )
}

export default Topic