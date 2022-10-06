import { useState } from "react";
import { v4 } from "uuid";
import { basicFetch } from "../../utils";
import FormInput from "./FormInput";

const ChooseProvider = ({providers, setProviders})=>{
    const [result, setResult] = useState(null);
    const [name, setName] = useState("");

    const search = async (event)=>{
        const formData = {
            name
        };
        const res = await basicFetch("/searchProviders?"+new URLSearchParams(formData));
        const data = await res.json();
        setResult(data);
    }

    const addProvider = (name,providerId) => {
        const _id = v4()
        setProviders([...providers, {name, providerId, _id}])
    }

    return (
        <div>
            <input onChange={(e)=>{setName(e.target.value)}}/>
            <button type="button" onClick={search}>Search</button>
            <div>
                {result&&result.providers.map((provider)=>{
                    return <button key={provider._id} onClick={()=>addProvider(provider.name,provider._id)}>{provider.name}</button>
                })}
            </div>
        </div>
    )
}
export default ChooseProvider;