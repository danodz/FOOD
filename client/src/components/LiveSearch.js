const LiveSearch = ({data, setDisplay, validation})=>{
    const handleChange = (event)=>{
        setDisplay(data.filter((item)=>{
            return validation(item, event.target.value);
        }));
    }

    return <input onChange={handleChange}/>
}
export default LiveSearch;