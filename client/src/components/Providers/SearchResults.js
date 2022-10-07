import { CircularProgress } from "@mui/material"
import { useParams, useSearchParams } from "react-router-dom"
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
    const [providers, status] = useFetch("/searchProviders?"+new URLSearchParams(searchParams));
    return (
        <>
        {status==="success"
            ?<>
                {providers.providers.map((provider)=>{
                    return <div key={provider._id}>{provider.name}</div>;
                })}
                <Pages nbPages={providers.nbPages} current={page}/>
            </>:status==="loading"?<CircularProgress/>
            :<>No data found</>
        }</>
    )
}
export default SearchResults;