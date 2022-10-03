import useFetch from "../../hooks/useFetch"
const Search = ()=>{
    const [foods, status] = useFetch("/searchFoods/0")
    console.log(foods, status)
    return (
        <>
        </>
    )
}
export default Search;