import { style } from "@mui/system";
import styled from "styled-components";
import nutrients from "../../data/nutrients.json"

const DisplayNutrient = ({id, value})=>{
    const nutrient = nutrients.names.find((nutrient)=>{
        return nutrient.id == id;
    })
    return (<Wrapper>
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
`