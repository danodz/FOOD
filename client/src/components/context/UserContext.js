import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect( ()=>{
        fetch("/currentUser")
        .then(res => {
            if(res.ok) {
                return res.json()
            }
        })
        .then(results => {
            if(results && results.data)
                setUser(results.data)
        })
        .catch((err) => console.log(err))
    }, [])
    
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};