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

    const addFood = async (food) => {
        const _id = v4()
        const res = await basicFetch("/getFood/"+food._id);
        const ingredientsData = await res.json();
        const ingredient = {
            _id: _id,
            foodId: food._id,
            name: ingredientsData.name,
            ingredientProviders: {
                provider: food.provider,
                providers: ingredientsData.providers.map((provider)=>{
                    return {
                        _id: provider._id,
                        name: provider.format
                    }
                })
            }
        }
        setFoods([...foods, ingredient])
        //setFoods([...foods, {name:food.name, foodId:food.foodId, _id, ingredientProviders}])
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