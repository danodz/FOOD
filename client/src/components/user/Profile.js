import {useParams } from "react-router-dom";
import Foods from "./Foods";
import ProfileNav from "./ProfileNav";
import EditUser from "./EditUser";

const Profile = ()=>{
    const {section} = useParams()
    return (
        <>
            <ProfileNav/>
            {!section&&<EditUser/>}
            {section==="foods"&&<Foods/>}
            
        </>
    )
}
export default Profile;