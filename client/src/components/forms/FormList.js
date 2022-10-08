import { cloneElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import FormListItem from "./FormListItem";
import FormHidden from "./FormHidden";

const FormList = ({name, children, values, setValues, noAdd})=>{
    const addItem = ()=>{
        setValues([...values, {_id:v4()}])
    }
    const removeItem = (index)=>{
        let newValues = [...values];
        newValues.splice(index, 1)
        setValues(newValues)
    }
    return (
        <fieldset name={name}>
            {name}
            {values.map((value, i)=>{
                if(!value._id)
                    value._id = v4()
                return <FormListItem key={value._id} removeFn={removeItem} index={i} defaultValue={values&&values[i]&&values[i]}>
                    <FormHidden name="_id" value={value._id}/>
                    {children}
                </FormListItem>
            })}
            {!noAdd&&<button type="button" onClick={addItem}>Add</button>}
        </fieldset>
    )
};
export default FormList;