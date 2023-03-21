import { useContext } from "react";
import { NavLink } from "react-router-dom"
import styled from "styled-components";
import { UserContext } from "./context/UserContext";
import Signout from "./user/Signout"

const Navigation = ()=>{
    const {userLoadStatus, user} = useContext(UserContext)
    const handleClick = (e)=>{
        if(e.target.classList.contains("active")){
            e.preventDefault();
        }
    };
    return (
        <Wrapper>
            <NavLink onClick={handleClick} to="/profile">Profile</NavLink>
            <NavLink onClick={handleClick} to="/editFood">Edit Food</NavLink>
            <NavLink onClick={handleClick} to="/searchFoods">Search Foods</NavLink>
            <NavLink onClick={handleClick} to="/compare">Compare</NavLink>
            <NavLink onClick={handleClick} to="/editProvider">Edit Provider</NavLink>
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
        cursor: default;
    }
`