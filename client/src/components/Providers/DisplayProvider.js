import styled from "styled-components";

const DisplayProvider = ({food})=>{
    return (
        <Wrapper>
            <div>{food.name}</div>
            <div>{food.description}</div>
        </Wrapper>
    )
}
export default DisplayProvider;
const Wrapper = styled.div`
`