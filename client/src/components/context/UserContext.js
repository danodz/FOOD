import { createContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userLoadStatus, setUserLoadStatus] = useState("loading");

    const loadUser = async ()=>{
        setUserLoadStatus("loading");
        const res = await fetch("/currentUser")
        if(res.ok) {
            const data = await res.json()
            if(data && data.data)
                setUser(data.data);
            else
                setUser(null);
        }
        setUserLoadStatus("idle");
    }

    useEffect( ()=>{
        loadUser();
    }, [])
    
    return (
        <UserContext.Provider value={{ user, loadUser, userLoadStatus }}>
            {children}
        </UserContext.Provider>
    );
};