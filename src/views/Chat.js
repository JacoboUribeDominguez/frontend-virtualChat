import { faArrowRightFromBracket, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Chat = ({
    isAdmin
}) => {
  return (
    <div className="chat-container">
        <div className="header-container">
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
        </div>
        <div className="chat-body">
            {
                (isAdmin) && (
                    <div className="chats-list-container">
                        <h3>
                            chats
                        </h3>
                        <div className="chat-element-list">
                            Topic
                        </div>
                    </div>
                )
            }
            <div className="chat-view" style={!isAdmin ? {width:'100%'} : {}}>
                <div className="messages-container">
                    <div className="message left">
                        <div>
                            this is another message
                        </div>
                    </div>
                    <div className="message right">
                        <div>
                            this is a message
                        </div>
                    </div>
                </div>
                <div className="send-message-chat">
                    <div className="input-send-message-chat">
                        <input placeholder='Write a message...'/>
                        <FontAwesomeIcon icon={faPaperPlane}/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat