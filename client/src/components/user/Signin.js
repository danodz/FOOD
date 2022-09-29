import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const Signin = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showErr, setShowErr] = useState(false)
    const navigate = useNavigate()
    
    const {setUser} = useContext(UserContext);

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
            const data = await res.json()
            if(res.ok){
                setUser(data.data)
                navigate("/")
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
            <label>Username:
                <input value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            </label>
            <label>Password:
                <input value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </label>
            {showErr && <>username or password invalid</>}
            <Input type="submit" value="Sign In"/>
        </Wrapper>
    )
}
export default Signin;

const Wrapper = styled.form`
width: 400px;

h1{
    color: #112a3b;
}

label {
    font-size: 20px;
    color: #112a3b;
}

input {
    padding: 10px;
}
`

const Input = styled.input`
background-color: #112a3b;
color:#fff;
font-size: 20px;
cursor: pointer;
`