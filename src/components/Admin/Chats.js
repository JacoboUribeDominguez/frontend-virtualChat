import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const Chats = ({chats}) => {

  const navigate = useNavigate();

  const handleClick = chat => {
    navigate('/chat', { state : { messages : chat.messages }})
  }

  return (
    <div className="chats-container">
      <div className="title-chats-container">
        <h3>Chats</h3>
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <div className="chats">
        {
          (chats && chats.length > 0) ? chats.map(chat => (
            <div
              className="chat"
              key={chat.id_chat_admin}
              style={{background:chat.color}}
              onClick={() => handleClick(chat)}>
              {chat.name}
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )) : (
            <div>
              No hay chats por el momento.
            </div>
          )
        }
        {/* <div
          className="chat major"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className="chat major"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className="chat major"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className="chat warning"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className="chat warning"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className="chat normal"
          onClick={() => navigate('/chat')}>
          Name of topic
          <FontAwesomeIcon icon={faTrash} />
        </div> */}
      </div>
    </div>
  )
}

export default Chats