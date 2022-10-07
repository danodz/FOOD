import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { basicFetch } from "../../utils";

const FoodListItem = ({_id, name})=>{
    const {user, loadUser} = useContext(UserContext);
    const owned = user.foods.some((food)=> food._id===_id)
    const fork = async ()=>{
        const res = await basicFetch("/forkFood/"+_id)
        const response = await res.json();
        loadUser();
        console.log(response)
    }
    return <div key={_id}>{name}
        {owned&&<Link to={"/foods?_id="+_id}>Edit</Link>}
        {<button onClick={fork}>Fork</button>}
    </div>;
}
export default FoodListItem;