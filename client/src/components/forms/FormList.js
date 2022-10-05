import { cloneElement, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import FormListItem from "./FormListItem";

const FormList = ({name, children, defaultValues})=>{
    const [defVals, setDefVals] = useState(defaultValues);
    const [content, setContent] = useState(defaultValues
        ?defaultValues.map(()=>v4())
        :[v4()]
    );
    const addItem = ()=>{
        setContent([...content, v4()])
    }
    const removeItem = (index)=>{
        let newContent = [...content];
        newContent.splice(index, 1)
        setContent(newContent)

        if(defVals){
            let newDefVals = [...defVals];
            newDefVals.splice(index, 1)
            setDefVals(newDefVals)
        }
    }
    return (
        <fieldset name={name}>
            {name}
            {content.map((id, i)=>{
                return <FormListItem key={id} removeFn={removeItem} index={i} defaultValue={defVals&&defVals[i]&&defVals[i]}>
                    {children}
                </FormListItem>
            })}
            <button type="button" onClick={addItem}>Add</button>
        </fieldset>
    )
};
export default FormList;