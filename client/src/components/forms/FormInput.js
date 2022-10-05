const FormInput = ({label, name, defaultValue})=>{
    return (
        <div className="name">
            <label>{label}
                <input name={name} defaultValue={defaultValue?defaultValue:""}/>
            </label>
        </div>
    )
}
export default FormInput;