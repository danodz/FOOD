import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CircularProgress } from '@mui/material';
import SignForm from "./SignForm";

const RequireUser = ({children})=>{
    const {userLoadStatus, user} = useContext(UserContext)
    return (<>
        {userLoadStatus==="idle"?user?<>{children}</>
        :<SignForm/>
        :<CircularProgress/>
        }
    </>)
}
export default RequireUser;