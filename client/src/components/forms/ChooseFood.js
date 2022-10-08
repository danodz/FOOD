import { useState } from "react";
import { v4 } from "uuid";
import { basicFetch } from "../../utils";
import FormInput from "./FormInput";

const ChooseFood = ({foods, setFoods})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const search = async (event)=>{
        const formData = {
            name
        };
        const res = await basicFetch("/searchFoods?"+new URLSearchParams(formData));
        const data = await res.json();
        setResult(data);
    }

    const addFood = (food) => {
        const _id = v4()
        const ingredientProviders = food.providers.map((provider)=>{
            return {
                ...provider,
                fullName: provider.name +": "+ provider.format
            }
        })

        setFoods([...foods, {name:food.name, foodId:food.foodId, _id, ingredientProviders}])
    }

    return (
        <div>
            <input onChange={(e)=>{setName(e.target.value)}}/>
            <button type="button" onClick={search}>Search</button>
            <div>
                {result&&result.results.map((food)=>{
                    return <button type="button" key={food._id} onClick={()=>addFood(food)}>{food.name}</button>
                })}
            </div>
        </div>
    )
}
export default ChooseFood;