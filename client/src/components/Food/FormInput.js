const FormInput = ({label, name})=>{
    return (
        <div className="name">
            <label>{label}
                <input name={name}/>
            </label>
        </div>
    )
}
export default FormInput;