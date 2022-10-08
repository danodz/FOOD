const SelectProvider = ({name, defaultValue})=>{
    return (
        <>{defaultValue&&<select name={name?name:""}>
            <option value="none">Pick a provider</option>
            {defaultValue.map((provider)=>{
                console.log(provider)
                return <option key={provider._id} value={provider._id}>{provider.fullName}</option>
            })}
        </select>}</>
    )
}
export default SelectProvider;