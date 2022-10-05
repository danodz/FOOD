import { useState, useEffect } from "react";
import { basicFetch } from "../utils";

const useFetch = (url, method, body) =>{
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState("loading");

    const [refetch, setRefetch] = useState(false);

    const reload = ()=>{
        setRefetch(!refetch);
    }

    useEffect(()=>{
        setStatus("loading");

        basicFetch(url, method, body)
        .then((res)=>{
            if(res.ok){
                return res.json()
            }else
                setStatus("error")
        })
        .then((res)=>{
            if(res){
                setResponse(res);
                setStatus("success")
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [url, refetch])

    return [response, status, reload];
}

export default useFetch;