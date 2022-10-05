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
    height: 100vh;

    form{
        display: flex;
        flex-direction: column;
    }
    form label{
        margin-bottom: 25px;
    }
    form label input{
        width: 100%;
    }
    h1{
        text-align: center;
    }
`