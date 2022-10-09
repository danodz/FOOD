import useComparer from "../hooks/useComparer";

const ComparerBtn = ({_id})=>{
    const comparer = useComparer();
    return (<>
        {comparer.items.includes(_id)
            ?<button onClick={()=>comparer.remove(_id)}>Remove from comparer</button>
            :<button onClick={()=>comparer.add(_id)}>Add to comparer</button>
        }
    </>)
}
export default ComparerBtn;