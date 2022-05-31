import React from 'react'
import { useNavigate } from 'react-router-dom'

const Form = ({ isUserActive }) => {

    const navigate = useNavigate();

    return (
        <div className="form-container">
            <div className="input-form-container">
                <input
                    className="input-form-login"
                    placeholder={isUserActive ? "Write your email" : "Write your admin user"}
                />
                <input
                    className="input-form-login"
                    placeholder={"Write your password"}
                />
            </div>
            <div className="btn-form-container">
                <button
                    className="btn-join"
                    onClick={() => {
                        if(isUserActive){
                            navigate('/help')
                            return;
                        }
                        navigate('/admin')
                    }}
                >
                    Join
                </button>
            </div>
        </div>
    )
}

export default Form