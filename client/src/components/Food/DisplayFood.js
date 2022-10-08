import styled from "styled-components";
import DisplayNutrient from "./DisplayNutrient";

const DisplayFood = ({food})=>{
    console.log(food)
    return (
        <Wrapper>
            <div>{food.name}</div>
            <div>{food.description}</div>
            <Nutrients>
                {Object.keys(food.nutrients).map((id)=>{
                    return <DisplayNutrient key={id} id={id} value={food.nutrients[id]}/>
                })}
            </Nutrients>
        </Wrapper>
    )
}
export default DisplayFood;
const Wrapper = styled.div`
`

const Nutrients = styled.div`
    display: flex;
`