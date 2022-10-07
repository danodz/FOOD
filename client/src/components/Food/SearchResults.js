import { CircularProgress } from "@mui/material"
import { Link, useParams, useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Pages from "./Pages"

const SearchResults = ()=>{
    const [query] = useSearchParams()
    const page = query.get("page")
    const searchParamKeys = ["name","page"];
    const searchParams = {};
    searchParamKeys.forEach((key)=>{
        if(query.get(key))
            searchParams[key] = query.get(key);
    })
    const [foods, status] = useFetch("/searchFoods?"+new URLSearchParams(searchParams));
    return (
        <>
        {status==="success"
            ?<>
                {foods.foods.map((food)=>{
                    return <div key={food._id}>{food.name}<Link to={"/foods?_id="+food._id}>Edit</Link></div>;
                })}
                <Pages nbPages={foods.nbPages} current={page}/>
            </>:status==="loading"?<CircularProgress/>
            :<>No data found</>
        }</>
    )
}
export default SearchResults;