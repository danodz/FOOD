import FormHidden from "./FormHidden";

const FormDisplay = ({label, name, defaultValue})=>{
    return (
        <div className="name">
            {label + ": "} 
            {defaultValue?defaultValue:""}
            <FormHidden name={name} defaultValue={defaultValue}/>
        </div>
    )
}
export default FormDisplay;