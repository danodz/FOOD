import {useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";

const Signup = ()=>{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [showErr, setShowErr] = useState(false)
    const navigate = useNavigate()
    const {loadUser} = useContext(UserContext);

    const submit = async (event)=> {
        event.preventDefault();
        setShowErr(false)
        try{
            const res = await fetch("/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    name: name
                })
            })
            const data = await res.json()
            if(res.ok){
                loadUser(data.data)
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
            <h1>Sign Up</h1>
            <label>
                <span>Username:</span>
                <input required value={username} onChange={(event)=>{setUsername(event.target.value)}}/>
            </label>
            <label>
                <span>Password:</span>
                <input required type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}/>
            </label>
            <label>
                <span>Display name:</span>
                <input required value={name} onChange={(event)=>{setName(event.target.value)}}/>
            </label>
            <button type="submit">Sign Up</button>
            {showErr && <>username already exists</>}
        </Wrapper>
    )
}
export default Signup;

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