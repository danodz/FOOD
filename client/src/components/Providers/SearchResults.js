import { CircularProgress } from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Pages from "./Pages"

const SearchResults = ()=>{
    const {page} = useParams()
    const [query] = useSearchParams()
    const [foods, status] = useFetch("/searchFoods/"+page+"?name="+query.get("name"))
    console.log(foods, status)
    return (
        <>
        {status==="success"
            ?<>
                {foods.foods.map((food)=>{
                    return <div key={food._id}>{food.name}</div>;
                })}
                <Pages nbPages={foods.nbPages} current={page}/>
            </>:status==="loading"?<CircularProgress/>
            :<>No data found</>
        }</>
    )
}
export default SearchResults;