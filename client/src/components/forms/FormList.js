import { cloneElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import FormListItem from "./FormListItem";

const FormList = ({name, children, values, setValues, noAdd})=>{
    // useEffect(()=>{
    //     setValues(values?values.map((value)=>{ return {...value, key:v4()}} )
    //                 :[{key:v4()}]
    //             );
    // }, [])
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
                return <FormListItem key={value._id} removeFn={removeItem} index={i} defaultValue={values&&values[i]&&values[i]}>
                    {children}
                </FormListItem>
            })}
            {!noAdd&&<button type="button" onClick={addItem}>Add</button>}
        </fieldset>
    )
};
export default FormList;