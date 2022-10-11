import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { basicFetch } from "../../utils";

const ChooseFood = ({foods, setFoods})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const search = async (event)=>{
        const formData = {
            name
        };
        const res = await basicFetch("/searchFoods?"+new URLSearchParams(formData));
        if(res.ok){
            const data = await res.json();
            setResult(data);
        }
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
    }

    return (
        <Wrapper>
            <input onChange={(e)=>{setName(e.target.value)}}/>
            <button type="button" onClick={search}>Search</button>
            <div className="results">
                {result&&result.results.map((food)=>{
                    return <button className="resultBtn" type="button" key={food._id} onClick={()=>addFood(food)}>{food.name}</button>
                })}
            </div>
        </Wrapper>
    )
}
export default ChooseFood;
const Wrapper = styled.div`
    .results{
        margin-top: 25px;
        display: flex;
        flex-wrap: wrap;
    }
    
    .resultBtn{
        width: 150px;
        text-align: left;
        padding: 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        font-size: 15px;
    }
`