import { faArrowRightFromBracket, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Topic = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    useEffect(() => {
        console.log(state)
        if (!localStorage.getItem('id_user')) {
            navigate('/')
        }
    }, [navigate, state])
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
                <h3>{ state.name }</h3>
                <div>
                    This is the information about the topic
                </div>
            </div>
        </div>
    )
}

export default Topic