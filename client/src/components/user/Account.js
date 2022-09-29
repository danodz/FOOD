import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Signin from "./Signin";
import Signup from "./Signup";

const Account = ()=>{
    const navigate = useNavigate();
    const {user} = useContext(UserContext)
    useEffect(()=>{
        if(user)
            navigate("/profile/")
    })

    return (
        <Wrapper>
            <Signin/>
            <Signup/>
        </Wrapper>
    )
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