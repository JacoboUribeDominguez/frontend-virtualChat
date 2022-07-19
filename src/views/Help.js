import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Help = () => {

  const navigate = useNavigate();

  const [optionsSupport, setOptionsSupport] = useState([]);

  const getOptions = useCallback(async () => {
    const res = await fetch(`${process.env.REACT_APP_API}options-support/getOptionsSupportForUser`, {
      method: 'POST',
      body: JSON.stringify({
        user_id: localStorage.getItem('id_user'),
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await res.json();

    setOptionsSupport(data.data);
  }, [])

  const onLogout = () => {
    localStorage.removeItem('id_user')
    navigate('/')
  }

  useEffect(() => {
    if (!localStorage.getItem('id_user')) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    getOptions()
  }, [getOptions])

  return (
    <div className="help-container">
      <div className="header-container">
        <FontAwesomeIcon icon={faArrowRightFromBracket} onClick={onLogout} />
      </div>
      <div className="help-body">
        <h3>Topics</h3>
        <div className="topic-container">
          {
            optionsSupport.map(option => (
              <div
                onClick={
                  () => navigate(
                    '/topic',
                    {
                      state: {
                        name: option.name,
                        id_option: option.id_option_support,
                        id_admin: option.id_admin,
                        color: option.color
                      }
                    }
                  )
                }
                key={option.id_option_support}
                className="topic-element">
                {option.name}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Help