import { useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";

const FormList = ({name, children})=>{
    const [content, setContent] = useState([v4()]);
    const addItem = ()=>{
        setContent([...content, v4()])
    }
    const removeItem = (index)=>{
        let arr = [...content];
        arr.splice(index, 1)
        setContent(arr)
    }
    return (
        <fieldset name={name}>
            {name}
            {
                content.map((item, i)=>{
                    return <fieldset key={item}>
                        {children}
                        <button type="button" onClick={()=>{removeItem(i)}}>Remove</button>
                    </fieldset>;
                })
            }
            <button type="button" onClick={addItem}>Add</button>
        </fieldset>
    )
};
export default FormList;