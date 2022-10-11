const FormHidden = ({name, defaultValue})=>{
    return (
        <input type="hidden" name={name} defaultValue={defaultValue?defaultValue:""}/>
    )
}
export default FormHidden;