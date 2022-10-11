import { Children, cloneElement } from "react";
import styled from "styled-components";

const FormListItem = ({removeFn, children, index, defaultValue})=>{
    return (
        <Fieldset>
            {Children.map(children,(child)=>{
                const childProps = defaultValue?{defaultValue:defaultValue[child.props.name]}:{}
                return cloneElement(child, childProps)
            })}
            <div><button type="button" onClick={()=>{removeFn(index)}}>Remove</button></div>
        </Fieldset>
    )
}
export default FormListItem;

const Fieldset = styled.fieldset`
    margin-right: 25px;
    margin-bottom: 15px;
    border: 1px solid gray;
    padding: 10px;

    *{
        margin-bottom: 10px;
    }
`