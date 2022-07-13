import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from '../components/login/Button';
import DivOption from '../components/login/DivOption';
import Form from '../components/login/Form';
import FormLoginSection from '../components/login/FormLoginSection';
import OptionSection from '../components/login/OptionSection';
import Title from '../components/login/Title';
import useLogin from '../hooks/useLogin';

const Login = () => {

    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('id_user')) {
            navigate(-1)
        }
    }, [navigate])
    const { isUserActive, isAdminActive, handleButtonActivate } = useLogin();

    return (
        <>
            <Title message="Welcome to VirtualChat" />
            <FormLoginSection>
                <OptionSection>
                    <DivOption>
                        <Button
                            whoIs="user"
                            isActive={isUserActive}
                            handleButtonActivate={handleButtonActivate}
                            titleButton="Join as user"
                        />
                    </DivOption>
                    <DivOption>
                        <Button
                            whoIs="admin"
                            isActive={isAdminActive}
                            handleButtonActivate={handleButtonActivate}
                            titleButton="Join as admin"
                        />
                    </DivOption>
                </OptionSection>
                <Form isUserActive={isUserActive} />
            </FormLoginSection>
        </>
    )
}

export default Login