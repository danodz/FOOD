import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { basicFetch } from "../../utils";
import ComparerBtn from "../ComparerBtn";

const FoodListItem = ({food})=>{
    const {user, loadUser} = useContext(UserContext);
    let owned = false;

    if(user)
        owned = food.userId?food.userId===user._id:false
    const forkFood = async ()=>{
        const res = await basicFetch("/forkFood/"+food._id)
        const response = await res.json();
        loadUser();
        console.log(response)
    }
    const deleteFood = async ()=>{
        const res = await basicFetch("/deleteFood/"+food._id)
        const response = await res.json();
        loadUser();
        console.log(response)
    }
    return <div key={food._id}>{food.name}
        {owned&&<Link to={"/foods?_id="+food._id}>Edit</Link>}
        {owned&&<button onClick={deleteFood}>Delete</button>}
        <button onClick={forkFood}>Copy</button>
        <ComparerBtn _id={food._id}/>
        <Link to={"/food/"+food._id}>Details</Link>
    </div>;
}
export default FoodListItem;