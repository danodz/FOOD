import styled from "styled-components";

const FormInput = ({label, name, defaultValue, required, type, max, min, step})=>{
    let val = defaultValue?defaultValue:"";
    if(defaultValue === 0){
        val = 0
    }
    return (
        <div>
            <Label><span>{label}</span>
                <input required={required&&required} type={type} name={name} defaultValue={val} max={max} min={min} step={step} />
            </Label>
        </div>
    )
}
export default FormInput;
const Label = styled.label`
    display: flex;
    justify-content: space-between;
`