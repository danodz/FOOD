import styled from "styled-components";
import Signin from "./Signin";
import Signup from "./Signup";

const SignForm = ()=>{
    return (
        <Wrapper>
            <Signin/>
            <Signup/>
        </Wrapper>
    )
}
export default SignForm;

const Wrapper = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: space-evenly;
    width: 1000px;
    margin: 0 auto;
`