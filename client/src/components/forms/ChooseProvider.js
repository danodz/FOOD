import { useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import { basicFetch } from "../../utils";

const ChooseProvider = ({providers, setProviders})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const search = async (event)=>{
        const formData = {
            name
        };
        const res = await basicFetch("/searchProviders?"+new URLSearchParams(formData));
        if(res.ok){
            const data = await res.json();
            setResult(data);
        }
    }

    const addProvider = (name,providerId) => {
        const _id = v4()
        setProviders([...providers, {name, providerId, _id}])
    }

    return (
        <Wrapper>
            <input onChange={(e)=>{setName(e.target.value)}}/>
            <button type="button" onClick={search}>Search</button>
            <div className="results">
                {result&&result.providers.map((provider)=>{
                    return <button className="resultBtn" type="button" key={provider._id} onClick={()=>addProvider(provider.name,provider._id)}>{provider.name}</button>
                })}
            </div>
        </Wrapper>
    )
}
export default ChooseProvider;

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