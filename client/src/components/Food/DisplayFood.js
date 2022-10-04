import styled from "styled-components";
import DisplayNutrient from "./DisplayNutrient";

const DisplayFood = ({food})=>{
    return (
        <Wrapper>
            <div>{food.name}</div>
            <div>{food.description}</div>
            <div>
                {Object.keys(food.nutrients).map((id)=>{
                    return <DisplayNutrient key={id} id={id} value={food.nutrients[id]}/>
                })}
            </div>
        </Wrapper>
    )
}
export default DisplayFood;
const Wrapper = styled.div`
`