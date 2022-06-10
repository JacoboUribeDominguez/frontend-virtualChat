import { useState } from "react";

const useLogin = () => {
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
        if (
            (whoIs === 'user' && isUserActive === true)
            ||
            (whoIs === 'admin' && isAdminActive === true)
        ) {
            return;
        }
        if (isUserActive === true) {
            activateAdmin();
        }
        else if (isAdminActive === true) {
            activateUser();
        }
    }

    return {
        handleButtonActivate,
        isUserActive,
        isAdminActive
    }
}

export default useLogin