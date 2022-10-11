import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const Signin = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showErr, setShowErr] = useState(false)
    const navigate = useNavigate()
    
    const {loadUser} = useContext(UserContext);

    const submit = async (event)=> {
        setShowErr(false)
        event.preventDefault();

        try{
            const res = await fetch("/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if(res.ok){
                loadUser()
                navigate("/profile")
            } else {
                setShowErr(true)
            }
        } catch(err){
            console.log(err)
        }
    }

    return (
        <Wrapper onSubmit={submit}>
            <h1>Sign In</h1>
            <label>
                <span>Username:</span>
                <input required value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            </label>
            <label>
                <span>Password:</span>
                <input required value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </label>
            {showErr && <>username or password invalid</>}
            <button type="submit">Sign in</button>
        </Wrapper>
    )
}
export default Signin;

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;

    h1{
        text-align: center;
    }

    label{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
    }

    button{
        margin-top: 10px;
    }
`