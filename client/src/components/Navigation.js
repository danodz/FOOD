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
            <NavLink to="/editFood">Edit Food</NavLink>
            <NavLink to="/searchFoods">Search Foods</NavLink>
            <NavLink to="/providers">New Provider</NavLink>
            <NavLink to="/searchProviders">Search Providers</NavLink>
            <NavLink to="/compare">Compare</NavLink>
            {(userLoadStatus==="idle"&&user)?<Signout/>: <NavLink to="/signin">Sign in</NavLink>}
        </Wrapper>
    )
}
export default Navigation;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 25px;
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