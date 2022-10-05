import { useContext } from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import Signout from "./user/Signout"

const Navigation = ()=>{
    const {userLoadStatus, user} = useContext(UserContext)
    return (
        <Wrapper>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/foods">New Food</NavLink>
            <NavLink to="/searchFoods">Search Foods</NavLink>
            <NavLink to="/providers">New Provider</NavLink>
            <NavLink to="/searchProviders">Search Providers</NavLink>
            {(userLoadStatus==="idle"&&user)?<Signout/>: <NavLink to="/signin">Sign in</NavLink>}
        </Wrapper>
    )
}
export default Navigation;

const Wrapper = styled.div`
    display: flex;
    a,button{
        padding: 10px 25px;
        text-decoration: none;
        background-color: lightgray;
        border: 1px solid black;
        color: black;
        cursor: pointer;
        font-size: 16px;
    }
    a:hover,button:hover{
        background-color: white;
    }
    a.active{
        background: #404040;
        color: white;
    }
`