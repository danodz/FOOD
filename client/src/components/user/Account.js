import { useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import { CircularProgress } from '@mui/material';

const Account = ()=>{
    const {userLoadStatus, user} = useContext(UserContext)

    return (<>
        {userLoadStatus==="idle"?user?<Profile/>
        :<Wrapper>
            <Signin/>
            <Signup/>
        </Wrapper>
        :<CircularProgress/>
        }
    </>)
}
export default Account;

const Wrapper = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    height: 100vh;

    form{
        display: flex;
        flex-direction: column;
    }
    form label{
        margin-bottom: 25px;
    }
    form label input{
        width: 100%;
    }
    h1{
        text-align: center;
    }
`