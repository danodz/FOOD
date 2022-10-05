import { useNavigate } from "react-router-dom";

const ProfileNav = ()=>{
    const navigate = useNavigate();
    const changeSection = (section)=>{
        navigate("/account/"+section)
    }
    return (
        <>
            <button onClick={()=>{changeSection("")}}>Profile</button>
            <button onClick={()=>{changeSection("foods")}}>Foods</button>
            <button onClick={()=>{changeSection("providers")}}>Providers</button>
        </>
    )
}
export default ProfileNav;