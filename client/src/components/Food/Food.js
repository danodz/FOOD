import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DisplayFood from "./DisplayFood";

const Food = ()=>{
    const {_id} = useParams()
    const [food, status] = useFetch("/getFood/"+_id)
    return (
        <>
            {status==="success"?
                <DisplayFood food={food}/>
                :<CircularProgress/>
            }
        </>
    )
}
export default Food;