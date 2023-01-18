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
                {historyStatus==="success"&&
                    <History>
                        <div className="compareTxt">Compare with older version</div>
                        {history.versions.map((version, i)=>{
                            return <button key={i} onClick={()=>setCurrentVersion(version)}>{
                                history.versions.length - (history.versions.length-i) + 1
                            }</button>
                        })}
                        {currentVersion&&<button key={-1} onClick={()=>setCurrentVersion(null)}>Hide history</button>}
                    </History>
                }

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
    margin-top: 25px;
    display: flex;
    >div{
        width: 50%;
    }
`
const History = styled.div`
    .compareTxt {
        margin-bottom: 10px;
    }
    button{
        text-decoration: none;
        color: black;
        font-size: 13px;
        cursor: pointer;
        background: lightgray;
        border: 1px solid black;
        margin-right: 10px;
        padding: 6px;
    }
`