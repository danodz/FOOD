import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DisplayProvider from "./DisplayProvider";

const Provider = ()=>{
    const {_id} = useParams()
    const [food, status] = useFetch("/getFood/"+_id)
    return (
        <>
            {status==="success"?
                <DisplayProvider food={food}/>
                :<CircularProgress/>
            }
        </>
    )
}
export default Provider;