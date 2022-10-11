import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import FoodListItem from "../Food/FoodListItem";
import LiveSearch from "../LiveSearch";
import EditUser from "./EditUser";

const Profile = ()=>{
    const {user} = useContext(UserContext);

    const [displayFoods, setDisplayFoods] = useState(user.foods);
    const validation = (item, value)=>{
        return item.name.toLowerCase().includes(value.toLowerCase());
    }
    return (<>
            <EditUser/>
            <Subtitle>Your foods</Subtitle>
            <Live>
                Filter by name: 
                <LiveSearch data={user.foods} setDisplay={setDisplayFoods} validation={validation}/>
            </Live>
            {displayFoods.map((food)=>{
                return <FoodListItem key={food._id} food={food}/>
            })}
    </>)
}
export default Profile;

const Live = styled.label`
    display: block;
    margin: 15px 0;
`

const Subtitle = styled.div`
    margin-top: 25px;
    font-weight: bold;
    font-size: 20px;
`