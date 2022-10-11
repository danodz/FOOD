import { useEffect, useState } from "react";
import styled from "styled-components";
import useComparer from "../../hooks/useComparer";
import { basicFetch } from "../../utils";
import DisplayFood from "./DisplayFood";

const Compare = ()=>{

    const comparer = useComparer();
    const [foods, setFoods] = useState([]);
    useEffect(()=>{
        Promise.all(comparer.items.map(async (_id)=>{
            const res = await basicFetch("/getFood/"+_id);
            const food = await res.json();
            console.log(food)
            return food;
        })).then(setFoods)
    }, [])

    return (
        <Wrapper>
            {foods.map((food)=>{
                return <DisplayFood key={food._id} food={food} />
            })}
        </Wrapper>
    )
}
export default Compare;

const Wrapper = styled.div`
    display: flex;

    >div{
        width: 50%;
    }
`