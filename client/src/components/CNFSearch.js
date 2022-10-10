import { useState } from "react";
import { v4 } from "uuid";
import { basicFetch } from "../utils";

const CNFSearch = ({handleCnfData})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const search = async (event)=>{
        if(!name){
            setResult(null);
            return
        }
        const res = await basicFetch("/cnf/search/"+name);
        const data = await res.json();
        console.log(data)
        setResult(data);
    }

    const setData = async (name,id) => {
        const res = await basicFetch("/cnf/details/"+id);
        const data = await res.json();
        handleCnfData({
            name,
            nutrients: data
        });
    }


    return (
        <div>
            <label>
                Search in the canadian nutrient file
                <input onChange={(e)=>{setName(e.target.value)}}/>
            </label>
            <button type="button" onClick={search}>Search</button>
            <div>
                {result&&result.map((food)=>{
                    return <button type="button" key={food.id} onClick={()=>setData(food.name,food.id)}>{food.name}</button>
                })}
            </div>
        </div>
    )
}
export default CNFSearch;