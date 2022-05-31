import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Help = () => {

  const navigate = useNavigate();
  
  return (
    <div className="help-container">
      <div className="header-container">
        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
      </div>
      <div className="help-body">
        <h3>Topics</h3>
        <div className="topic-container">
          <div 
            onClick={() => navigate('/topic')}
            className="topic-element">
            this is a topic
          </div>
          <div 
            onClick={() => navigate('/topic')}
            className="topic-element">
            this is a topic
          </div>
          <div 
            onClick={() => navigate('/topic')}
            className="topic-element">
            this is a topic
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help