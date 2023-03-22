import { useState } from "react";

const useComparer = ()=>{
    const loadItems = ()=>{
        const comparer = localStorage.getItem("comparer");
        if(comparer)
            return JSON.parse(comparer)
        else{
            return [];
        }
    }
    const [items, setItems] = useState(loadItems());

    const add = (_id)=>{
        const newItems = [...loadItems(), _id]
        console.log(newItems)
        localStorage.setItem("comparer", JSON.stringify(newItems))
        setItems(newItems)
    }
    const remove = (_id)=>{
        const newItems = [...loadItems()]
        const index = newItems.findIndex((id)=>id===_id)
        newItems.splice(index,1)
        localStorage.setItem("comparer",JSON.stringify(newItems))
        setItems(newItems)
    }
    
    return {
        add,
        remove,
        items
    }
}

export default useComparer;