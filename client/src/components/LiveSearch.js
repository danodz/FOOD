import { useState } from "react";

const LiveSearch = ({data, setDisplay, validation})=>{
    console.log(data)
    const handleChange = (event)=>{
        setDisplay(data.filter((item)=>{
            return validation(item, event.target.value);
        }));
    }

    return <input onChange={handleChange}/>
}
export default LiveSearch;