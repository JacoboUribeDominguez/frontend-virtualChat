import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import OptionsSupport from '../components/Admin/OptionsSupport'
import Severity from '../components/Admin/Severity'
import Chats from '../components/Admin/Chats'
import io from 'socket.io-client';
import Information from '../components/Admin/Information'

const Admin = () => {

    const [chats, setChats] = useState([]);

    const [socket, setSocket] = useState(null);
    
    const navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('id_user')) {
            navigate('/')
        }
    }, [navigate])

    const onLogout = () => {
        localStorage.removeItem('id_user')
        navigate('/')
    }

    /* useeffect for when we are connect */
    useEffect(() => {
        if(socket !== null){
            socket.on('connect', () => {
                socket.emit('join', localStorage.getItem('id_user'))
                socket.on('newconversation', ({message, topic}) => {
                    setChats((prevState) => {
                        if(prevState.find(conversation => conversation.messages.length > 0)){
                            return(
                                [
                                    ...prevState.slice(0, prevState.length - 1),
                                    {
                                        ...prevState[prevState.length - 1],
                                        messages: [message, ...prevState[prevState.length - 1].messages]
                                    }
                                ]
                            )
                        } else {
                            return(
                                [
                                    ...prevState,
                                    {
                                        id_chat_admin: 1,
                                        color: topic.color,
                                        name : topic.name,
                                        messages: [message]
                                    }
                                ]
                            )
                        }
                    })
                })
            })
        }
    }, [socket])

    /* useeffect for leave connection */
    useEffect(() => {
        return () => {
            if(socket !== null){
                socket.emit('leave room', localStorage.getItem('id_user'))
                socket.disconnect()
            }
        }
    }, [socket])

    /* useeffect for connect */
    useEffect(() => {
        setSocket(io('https://backendvirtualchat.herokuapp.com'));
    }, [])
    
    return (
        <div className="admin-container">
            <div className="header-container">
                <FontAwesomeIcon className="logout" icon={faArrowRightFromBracket} onClick={onLogout} />
            </div>
            <div className="body-admin-container">
                <div className="left-side-container">
                    <OptionsSupport />
                    <Chats chats={chats}/>
                </div>
                <div className="right-side-body-admin-container">
                    <Severity />
                    <Information />
                </div>
            </div>
        </div>
    )
}

export default Admin