import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import DisplayFood from "./DisplayFood";

const Food = ()=>{
    const {_id} = useParams()
    const [food, status] = useFetch("/getFood/"+_id)
    const [history, historyStatus] = useFetch("/getHistory/"+_id);
    const [currentFood, setCurrentFood] = useState(null)
    const [currentVersion, setCurrentVersion] = useState(null)
    useEffect(()=>{
        if(status === "success"){
            setCurrentFood(food)
        }
    }, [status])
    return (
        <>
            {currentFood&&status==="success"?<>
                {historyStatus==="success"&&<>
                    {history.versions.map((version, i)=>{
                        return <button key={i} onClick={()=>setCurrentVersion(version)}>{
                            history.versions.length - (history.versions.length-i) + 1
                        }</button>
                    })}
                    <button key={-1} onClick={()=>setCurrentVersion(null)}>No history</button>
                </>}

                <Wrapper>
                    <DisplayFood food={currentFood}/>
                    {currentVersion&&<DisplayFood food={currentVersion}/>}
                </Wrapper>
                </>
            :<CircularProgress/> }
        </>
    )
}
export default Food;

const Wrapper = styled.div`
    display: flex;
`