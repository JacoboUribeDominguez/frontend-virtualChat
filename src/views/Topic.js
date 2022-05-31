import { faArrowRightFromBracket, faComment } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Topic = () => {
    const navigate = useNavigate();
  return (
    <div className="topic-container">
        <div className="header-container">
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
        </div>
        <div className="topic-body">
            <div className="start-new-conversation-container">
                <button
                    onClick={() => navigate('/topic/chat')}
                    className="btn-start-new-conversation"
                >
                    Start a new conversation
                    <FontAwesomeIcon icon={faComment}/>
                </button>
            </div>
            <h3>Topic</h3>
            <div>
                This is the information about the topic
            </div>
        </div>
    </div>
  )
}

export default Topic