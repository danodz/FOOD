import { useContext, useEffect } from "react";
import {UserContext} from "../context/UserContext"
import Foods from "./Foods";

const Profile = ()=>{
    const {user} = useContext(UserContext)
    return (
        <>
            {user&&user.name}
            <Foods/>
        </>
    )
}
export default Profile;