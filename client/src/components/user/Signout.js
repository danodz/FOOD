import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext";

const Signout = ()=>{
    const navigate = useNavigate();
    const {loadUser} = useContext(UserContext);
    const logout = ()=>{
        fetch("/signout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async ()=>{
            await loadUser();
            navigate("/signin");
        })
    }

    return (
        <button onClick={logout}>
            Sign out
        </button>
    )
}
export default Signout;