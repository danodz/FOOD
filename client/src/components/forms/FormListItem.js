import { Children, cloneElement } from "react";

const FormListItem = ({removeFn, children, index, defaultValue})=>{
    return (
        <fieldset>
            {Children.map(children,(child)=>{
                const childProps = defaultValue?{defaultValue:defaultValue[child.props.name]}:{}
                return cloneElement(child, childProps)
            })}
            <button type="button" onClick={()=>{removeFn(index)}}>Remove</button>
        </fieldset>
    )
}
export default FormListItem;