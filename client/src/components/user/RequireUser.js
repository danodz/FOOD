import { useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";
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