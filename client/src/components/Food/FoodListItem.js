import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { basicFetch } from "../../utils";
import ComparerBtn from "../ComparerBtn";
import styled from "styled-components";

const FoodListItem = ({food})=>{
    const {user, loadUser} = useContext(UserContext);
    let owned = false;

    if(user)
        owned = food.userId?food.userId===user._id:false
    const forkFood = async ()=>{
        const res = await basicFetch("/forkFood/"+food._id)
        const response = await res.json();
        loadUser();
    }
    const deleteFood = async ()=>{
        const res = await basicFetch("/deleteFood/"+food._id)
        const response = await res.json();
        loadUser();
    }

    return <Wrapper key={food._id}>
        <div className="name">
            {food.amount&&food.amount+"g of "}
            {food.owner&&food.owner.name+"'s "}
            {food.name}
        </div>
        {owned&&<Link to={"/editFood?_id="+food._id}>Edit</Link>}
        {owned&&<button onClick={deleteFood}>Delete</button>}
        <button onClick={forkFood}>Copy</button>
        <ComparerBtn _id={food._id}/>
        <Link to={"/food/"+food._id}>Details</Link>
    </Wrapper>;
}
export default FoodListItem;

const Wrapper = styled.div`
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid lightgray;
    display: flex;

    .name{
        width: 200px;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-direction: column;
    }

    a,button{
        text-decoration: none;
        color: black;
        font-size: 15px;
        cursor: pointer;

        background: lightgray;
        border: 1px solid black;
        margin-right: 10px;
        padding: 10px;
    }
`