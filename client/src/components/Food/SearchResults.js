import { adaptV4Theme, CircularProgress } from "@mui/material"
import { cloneElement, useEffect, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import useFetch from "../../hooks/useFetch"
import Pages from "./Pages"
import LiveSearch from "../LiveSearch";

const SearchResults = ({fields, url, children})=>{
    const [query] = useSearchParams()
    const page = query.get("page")
    const searchParams = {};
    [...fields, "page"].forEach((field)=>{
        if(query.get(field))
            searchParams[field] = query.get(field);
    })
    const [results, status] = useFetch(url+"?"+new URLSearchParams(searchParams));
    return (
        <>
        {status==="success"
            ?<>
                {results.results.map((result)=>{
                    return cloneElement(children, {food:result, key:result._id})
                })}
                <Pages nbPages={results.nbPages} current={page}/>
            </>:status==="loading"?<CircularProgress/>
            :<>No data found</>
        }</>
    )
}
export default SearchResults;