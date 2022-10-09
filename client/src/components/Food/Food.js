import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DisplayFood from "./DisplayFood";

const Food = ()=>{
    const {_id} = useParams()
    const [food, status] = useFetch("/getFood/"+_id)
    const [history, historyStatus] = useFetch("/getHistory/"+_id);
    const [currentFood, setCurrentFood] = useState(null)

    useEffect(()=>{
        if(status === "success"){
            console.log(1)
            setCurrentFood(food)
        }
    }, [status])
    return (
        <>
            
            {currentFood&&status==="success"?<>
                {historyStatus==="success"&&<>
                    {history.versions.map((version, i)=>{
                        return <button key={i} onClick={()=>setCurrentFood(version)}>{
                            history.versions.length - (history.versions.length-i) + 1
                        }</button>
                    })}
                    <button key={-1} onClick={()=>setCurrentFood(food)}>current</button>
                </>}
                <DisplayFood food={currentFood}/></>
                :<CircularProgress/>
            }
        </>
    )
}
export default Food;