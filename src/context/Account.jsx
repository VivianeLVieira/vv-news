import { createContext, useState } from "react";

export const AccountContext = createContext(null)

export const AccountProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState('tickle122')

    return (
        <AccountContext.Provider
        value={{loggedUser:loggedUser, setLoggedUser:setLoggedUser }}>
            {children}
        </AccountContext.Provider>
    )
}