import React, { useState } from 'react'
import Button from '../components/login/Button';
import Form from '../components/login/Form';
import Title from '../components/login/Title';

const Login = () => {

    const [isUserActive, setIsUserActive] = useState(true);
    const [isAdminActive, setIsAdminActive] = useState(false);

    const activateUser = () => {
        setIsAdminActive(false);
        setIsUserActive(true);
    }

    const activateAdmin = () => {
        setIsAdminActive(true);
        setIsUserActive(false);
    }

    const handleButtonActivate = (whoIs) => {
        if(
            (whoIs === 'user' && isUserActive === true)
            ||
            (whoIs === 'admin' && isAdminActive === true)
        ){
            return;
        }
        if(isUserActive === true){
            activateAdmin();
        }
        else if(isAdminActive === true){
            activateUser();
        }
    }

    return (
        <>  
            <Title message = "Welcome to VirtualChat"/>
            <div className="form-login-section">
                <div className="options-section">
                    <div className="option">
                        <Button
                            whoIs="user"
                            isActive={isUserActive}
                            handleButtonActivate={handleButtonActivate}
                            titleButton = "Join as user"
                        />  
                    </div>
                    <div className="option">
                        <Button
                            whoIs="admin"
                            isActive={isAdminActive}
                            handleButtonActivate={handleButtonActivate}
                            titleButton = "Join as admin"
                        />
                    </div>
                </div>
                <Form isUserActive={isUserActive} />
            </div>
        </>
    )
}

export default Login