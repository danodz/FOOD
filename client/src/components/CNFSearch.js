import { useRef, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { basicFetch } from "../utils";

const CNFSearch = ({handleCnfData})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");
    const nameField = useRef(null);

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

    const clear = ()=>{
        setResult(null)
    }

    const setData = async (name,id) => {
        const res = await basicFetch("/cnf/details/"+id);
        const data = await res.json();
        setResult(null)
        handleCnfData({
            name,
            nutrients: data
        });
    }


    return (
        <Wrapper>
            <label>
                Search in the canadian nutrient file
                <input ref={nameField} onChange={(e)=>{setName(e.target.value)}}/>
            </label>
            <button type="button" onClick={search}>Search</button>
            <button type="button" onClick={clear}>Clear</button>
            <div className="results">
                {result&&result.map((food)=>{
                    return <button className="resultBtn" type="button" key={food.id} onClick={()=>setData(food.name,food.id)}>{food.name}</button>
                })}
            </div>
        </Wrapper>
    )
}
export default CNFSearch;

const Wrapper = styled.div`
    margin-bottom: 10px;
    input,>button{
        margin-left: 10px;
    }

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