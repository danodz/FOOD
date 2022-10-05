import {useParams } from "react-router-dom";
import Foods from "./Foods";
import Providers from "./Providers";
import ProfileNav from "./ProfileNav";
import EditUser from "./EditUser";

const Profile = ()=>{
    const {section} = useParams()
    return (
        <>
            <ProfileNav/>
            {!section&&<EditUser/>}
            {section==="foods"&&<Foods/>}
            {section==="providers"&&<Providers/>}
            
        </>
    )
}
export default Profile;