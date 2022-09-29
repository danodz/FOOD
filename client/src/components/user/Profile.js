import { useContext, useEffect } from "react";
import {UserContext} from "../context/UserContext"

const Profile = ()=>{
    const {user} = useContext(UserContext)
    return (
        <>
            {user&&user.name}
        </>
    )
}
export default Profile;