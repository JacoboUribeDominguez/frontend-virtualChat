import React, { useState } from 'react'
import Form from '../components/login/Form';

const Login = () => {

    const [isUserActive, setIsUserActive] = useState(true);

  return (
    <>
    <h1 className="title-app">Welcome to APP</h1>
      <div className="form-login-section">
            <div className="options-section">
                <div className="option">
                    <button
                        onClick={() => setIsUserActive(true)}
                        className={isUserActive ? "option-button selected" : 'option-button'}
                    >
                        Join as user
                    </button>
                </div>
                <div className="option">
                    <button
                        onClick={() => setIsUserActive(false)}
                        className={!isUserActive ? "option-button selected" : 'option-button'}
                    >
                        Join as admin
                    </button>
                </div>
            </div>
            <Form isUserActive={isUserActive}/>
      </div>
    </>
  )
}

export default Login