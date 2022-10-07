import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import FoodListItem from "../Food/FoodListItem";
import EditUser from "./EditUser";

const Profile = ()=>{
    const {user} = useContext(UserContext);
    return (<>
            <EditUser/>
            {user.foods.map((food)=>{
                return <FoodListItem key={food._id} food={food}/>
            })}
    </>)
}
export default Profile;