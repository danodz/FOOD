const SelectProvider = ({name, defaultValue})=>{
    const {provider, providers} = defaultValue;
    return (
        <>{<select defaultValue={provider} name={name?name:""}>
            <option value="none">Pick a provider</option>
            {providers.map((provider)=>{
                return <option key={provider._id} value={provider._id}>{provider.name}</option>
            })}
        </select>}</>
    )
}
export default SelectProvider;