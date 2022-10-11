import styled from "styled-components";

const FormInput = ({label, name, defaultValue})=>{
    return (
        <div>
            <Label><span>{label}</span>
                <input name={name} defaultValue={defaultValue?defaultValue:""}/>
            </Label>
        </div>
    )
}
export default FormInput;
const Label = styled.label`
    display: flex;
    justify-content: space-between;
`