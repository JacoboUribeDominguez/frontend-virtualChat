import { faArrowRightFromBracket, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { v4 } from 'uuid';

// const socket = io();

const Chat = ({
    isAdmin
}) => {

    const { state } = useLocation();

    const [messages, setMessages] = useState(state.messages ? state.messages : [])

    const [AdminInChat, setAdminInChat] = useState(false);

    const [socket, setSocket] = useState(null);
    // const socket = io('http://localhost:3001');
    const navigate = useNavigate();

    /* sockets events */
    useEffect(() => {
        if (!localStorage.getItem('id_user')) {
            navigate('/')
        } else {
            if (socket !== null) {
                socket.on('connect', () => {
                    if (!isAdmin) {
                        socket.emit('join', `${state.id_admin}`)
                        socket.emit('join', `${state.id_admin}${localStorage.getItem('id_user')}`)
                    } else {
                        socket.emit('join', `${localStorage.getItem('id_user')}${state.messages[0].id_user}`)
                        socket.emit('AdminJoinInChat', `${localStorage.getItem('id_user')}${state.messages[0].id_user}`)
                    }
                })
                socket.on('AnswerMessage', (message) => {
                    if(isAdmin !== message.isFromAdmin){
                        console.log('que')
                        setMessages(prevState => [message, ...prevState])
                    }
                })
                socket.on('AdminJoinInChat', () => {
                    setAdminInChat(true);
                })
            }
        }
    }, [navigate, socket, state, isAdmin])

    //use effect for leaving component
    useEffect(() => {
        return () => {
            if (socket !== null) {
                if (isAdmin) {
                    socket.emit('leave room', `${localStorage.getItem('id_user')}${state.messages[0].id_user}`)
                } else {
                    socket.emit('leave room', `${state.id_admin}${localStorage.getItem('id_user')}`)
                }
                socket.disconnect()
            }
        }
    }, [socket, state, isAdmin])

    //use effect for joing to component
    useEffect(() => {
        setSocket(io('http://localhost:3001'));
    }, [])

    const [message, setMessage] = useState('');

    const sendMessage = (event) => {

        const sendMessageToServer = () => {
            if (message.length > 0) {
                const newMessage = {
                    id: v4(),
                    message,
                    isFromAdmin: isAdmin,
                    id_user: localStorage.getItem('id_user') //OJO
                }
                if (!isAdmin) {
                    if(!AdminInChat){
                        // console.log('entre a primer envio')
                        socket.emit('sendmessage', {
                            message: newMessage,
                            roomChat: `${state.id_admin}${localStorage.getItem('id_user')}`,
                            roomAdmin: state.id_admin,
                            topic: {
                                name: state.name,
                                color: state.color === null ? '#a8a8a8' : state.color
                            }
                        })
                    } else {
                        // console.log('entre a respuesta')
                        socket.emit('answermessage', {
                            message: newMessage,
                            room: `${state.id_admin}${localStorage.getItem('id_user')}`,
                        })
                    }
                } else {
                    socket.emit('answermessage', {
                        message: newMessage,
                        room: `${localStorage.getItem('id_user')}${state.messages[0].id_user}`,
                    })
                }
                setMessages(prevState => [newMessage, ...prevState])
                setMessage('')
            }
        }

        if (event.key) {
            if (event.key === 'Enter') {
                sendMessageToServer()
            }
        } else {
            sendMessageToServer()
        }
    }

    return (
        <div className="chat-container">
            <div className="header-container">
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
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
                <div className="chat-view" style={!isAdmin ? { width: '100%' } : {}}>
                    <div className="messages-container">
                        {
                            messages.length > 0 && messages.map(message => (
                                <div 
                                    key={message.id} 
                                    className={
                                        `message
                                        ${(isAdmin && message.isFromAdmin === true) ? 'right' : ''}
                                        ${(isAdmin && message.isFromAdmin === false) ? 'left' : ''}
                                        ${(!isAdmin && message.isFromAdmin === true) ? 'left' : ''}
                                        ${(!isAdmin && message.isFromAdmin === false) ? 'right' : ''}`
                                    }
                                >
                                    <div>
                                        {message.message}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="send-message-chat">
                        <div className="input-send-message-chat">
                            <input onKeyDown={sendMessage} onChange={(e) => setMessage(e.target.value)} placeholder='Write a message...' value={message} />
                            <FontAwesomeIcon icon={faPaperPlane} onClick={sendMessage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat