import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = ({ isUserActive }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async() => {
        if(user.length > 0 && password.length > 0){
            const res = await fetch('https://backendvirtualchat.herokuapp.com/users/login', {
                method: 'POST',
                body: JSON.stringify({
                    user,
                    password,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await res.json();
            console.log(data);
            if(data.data && data.data !== null){
                localStorage.setItem('id_user', data.data)
                if(isUserActive){
                    navigate('/help')
                    return;
                }
                navigate('/admin')
            } else {
                console.log('errror')
            }

        }
        setUser('');
        setPassword('');
    }

    return (
        <div className="form-container">
            <div className="input-form-container">
                <input
                    className="input-form-login"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder={isUserActive ? "Write your email" : "Write your admin user"}
                />
                <input
                    className="input-form-login"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={"Write your password"}
                />
            </div>
            <div className="btn-form-container">
                <button
                    className="btn-join"
                    onClick={handleLogin}
                >
                    Join
                </button>
            </div>
        </div>
    )
}

export default Form