import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import styled from "styled-components";
import nutrients from "../../data/nutrients.json"
import { UserContext } from "../context/UserContext";

const DisplayNutrient = ({id, value, toggler})=>{
    const {user} = useContext(UserContext);
    const [forceDisplay, setForceDisplay] = useState(true);
    const nutrient = nutrients.names.find((nutrient)=>{
        return nutrient.id === id;
    })

    const forceDisplayFn = ()=>{
        setForceDisplay(current=>!current)
    }

    useEffect(()=>{
        if(toggler.current)
            toggler.current.addEventListener("click", forceDisplayFn)
        return ()=>{
            if(toggler.current)
                toggler.current.removeEventListener("click", forceDisplayFn)
        }
    },[])

    return (user&&<Wrapper className={"nutrient " + (user.nutrients.includes(id)?"favorite ":"") + (forceDisplay?"forceDisplay":"")}>
        <div>
            {nutrient.name}
        </div>
        <div>
            {Math.round(value)}
            {nutrient.unit}
        </div>
    </Wrapper>)
}
export default DisplayNutrient;
const Wrapper = styled.div`
    border: 1px solid black;
    margin-right: 25px;
    margin-top: 10px;
    padding: 10px;
    display: none;
    &.favorite{
        display: block;
    }
    &.forceDisplay{
        display: block;
    }
`