import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowRightFromBracket, faPlus, faTrash, faTurnDown } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const Admin = () => {

    const navigate = useNavigate();
  return (
    <div className="admin-container">
        <div className="header-container">
            <FontAwesomeIcon icon={faArrowRightFromBracket}/>
        </div>
        <div className="body-admin-container">
            <div className="left-side-container">
                <div className="options-support">
                    <h3
                        className="options-support-title"
                    >
                        Elements to support users
                        <FontAwesomeIcon icon={faTurnDown} />
                    </h3>
                    <div className="option-support selected">
                        this is an element
                    </div>
                    <div className="option-support">
                        this is an element
                    </div>
                    <div className="option-support">
                        this is an element
                    </div>
                    <div className="option-support-add">
                        <input placeholder="Add element"/>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                <div className="chats-container">
                    <div className="title-chats-container">
                        <h3>Chats</h3>
                        <FontAwesomeIcon icon={faArrowDown} />
                    </div>
                    <div className="chats">
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-side-body-admin-container">
                <div>
                    <h3
                        className="severity-title"
                    >
                        Severity
                    </h3>
                    <div className="severity-container">
                        <div
                            className="severity"
                        >
                            Severity 1
                        </div>
                        <div
                            className="severity"
                        >
                            Severity 2
                        </div>
                        <div
                            className="severity"
                        >
                            Severity 3
                        </div>
                        <div
                            className="add-severity"
                        >
                            Add
                            <FontAwesomeIcon icon={faPlus} />
                        </div>
                    </div>
                </div>
                <div className="information-container">
                    <h3>
                        Information of element selected
                    </h3>
                    <div className="information">
                        here we are the information of the problem
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Admin