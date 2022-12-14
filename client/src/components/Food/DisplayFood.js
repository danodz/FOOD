import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { basicFetch } from "../../utils";
import DisplayNutrient from "./DisplayNutrient";
import FoodListItem from "./FoodListItem";

const DisplayFood = ({food})=>{
    const [ingredients, setIngredients] = useState([]);
    const [providers, setProviders] = useState([]);

    const allNutrients = {}

    if(food.ingredientsNutritionTotal)
        Object.keys(food.ingredientsNutritionTotal).forEach((nutrient)=>{
            if(allNutrients[nutrient]){
                allNutrients[nutrient] += parseFloat(food.ingredientsNutritionTotal[nutrient]);
            } else{
                allNutrients[nutrient] = parseFloat(food.ingredientsNutritionTotal[nutrient]);
            }
        });
    if(food.nutrients)
        Object.keys(food.nutrients).forEach((nutrient)=>{
            if(allNutrients[nutrient]){
                allNutrients[nutrient] += parseFloat(food.nutrients[nutrient]);
            } else{
                allNutrients[nutrient] = parseFloat(food.nutrients[nutrient]);
            }
        });

    useEffect(()=>{
        if(food.ingredients)
            Promise.all(food.ingredients.map(async (ingredient)=>{
                const res = await basicFetch("/getFood/"+ingredient.foodId);
                const data = await res.json();
                return {
                    ...data,
                    amount:ingredient.amount
                }
            })).then(setIngredients);

        if(food.providers){
            const mainProviders = {};
            Promise.all(food.providers.map(async (provider)=>{
                if(!mainProviders[provider.providerId]){
                    const res = await basicFetch("/getProvider/"+provider.providerId);
                    mainProviders[provider.providerId] = await res.json();
                }
                return {
                    ...provider,
                    name: mainProviders[provider.providerId].name
                }
            })).then(setProviders);
        }
    },[])

    return (
        <Wrapper>
            <General>
                <Link className="editLink" to={"/editFood?_id="+food._id}>Edit</Link>
                <h1>General Info</h1>
                <div>
                    <div>Owner:{food.owner.name}</div>
                    <div>Name:{food.name}</div>
                    <div>Description:{food.description}</div>
                    <div>Ingredients cost : {food.ingredientsCostTotal}</div>
                    {food.img&&<img src={food.img}/>}
                </div>
            </General>
            {food.tags&&<Tags>
                <h1>Tags</h1>
                <div className="section">
                    {food.tags.map((tag)=>{
                        return <span className="tag" key={tag._id}>
                            {tag.tag}
                            <span className="comma">, </span>
                        </span>
                    })}
                </div>
            </Tags>}
            {food.nutrients&&<Nutrients>
                <h1>Nutrients</h1>
                <div className="section">
                    {Object.keys(allNutrients).map((id)=>{
                        return <DisplayNutrient key={id} id={id} value={allNutrients[id]}/>
                    })}
                </div>
                <h1>Custom Nutrients</h1>
                <div className="section">
                    {Object.keys(food.nutrients).map((id)=>{
                        return <DisplayNutrient key={id} id={id} value={food.nutrients[id]}/>
                    })}
                </div>
                <h1>Ingredients Nutrients</h1>
                <div className="section">
                    {Object.keys(food.ingredientsNutritionTotal).map((id)=>{
                        return <DisplayNutrient key={id} id={id} value={food.ingredientsNutritionTotal[id]}/>
                    })}
                </div>
            </Nutrients>}
            {ingredients&&<Ingredients>
                <h1>Ingredients</h1>
                <div className="section">
                    {ingredients.map((ingredient)=>{
                        return <>{ingredient&&<FoodListItem key={ingredient._id} food={ingredient}/>}</>
                    })}
                </div>
            </Ingredients>}
            {food.measures&&<Measures>
                <h1>Measures</h1>
                <div className="section">
                {food.measures.map((measure)=>{
                    return <div key={measure._id}>{measure.name}</div>
                })}
                </div>
            </Measures>}
            {providers&&<Providers>
                <h1>Providers</h1>
                <div className="section">
                    {providers.map((provider)=>{
                        return <div key={provider._id}>{provider.name + ": " + provider.format}</div>
                    })}
                </div>
            </Providers>}
        </Wrapper>
    )
}
export default DisplayFood;
const Wrapper = styled.div`
    h1{
        font-size: 17px;
        font-weight: bold;
        margin-top: 15px;
    }

    .editLink{
        display: inline-block;
        color: black;
        font-size: 15px;
        cursor: pointer;
        background: lightgray;
        border: 1px solid black;
        margin-right: 10px;
        padding: 10px;
    }
`
const General = styled.div`
`

const Nutrients = styled.div`
    .section{
        display: flex;
    }

`

const Ingredients = styled.div`
`

const Measures = styled.div`
`
const Providers = styled.div`
`
const Tags = styled.div`
    .comma{
        white-space: pre;
    }
    .tag:last-child .comma{
        display: none;
        margin:0;
    }
`