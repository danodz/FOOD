import styled from "styled-components";

const Submit = ({children})=>{
    return (
        <Btn type="submit">
            {children}
        </Btn>
    )
}
export default Submit;
const Btn = styled.button`
    font-size: 20px;
    padding: 6px 20px;
    background: lightgray;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 25px;
`