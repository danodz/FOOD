import { cloneElement, useEffect, useState } from "react";
import { v4 } from "uuid";
import styled from "styled-components";
import FormListItem from "./FormListItem";
import FormHidden from "./FormHidden";

const FormList = ({name, children, values, setValues, noAdd, searchAdder})=>{
    const addItem = ()=>{
        setValues([...values, {_id:v4()}])
    }
    const removeItem = (index)=>{
        let newValues = [...values];
        newValues.splice(index, 1)
        setValues(newValues)
    }
    return (
        <Fieldset name={name}>
            <div className="header">
                <span>{name}</span>
                {!noAdd&&<button type="button" onClick={addItem}>Add</button>}
            </div>
            {searchAdder&&searchAdder}
            <div className="items">
                {values.map((value, i)=>{
                    if(!value._id)
                        value._id = v4()
                    return <FormListItem key={value._id} removeFn={removeItem} index={i} defaultValue={values&&values[i]&&values[i]}>
                        <FormHidden name="_id" value={value._id}/>
                        {children}
                    </FormListItem>
                })}
            </div>
        </Fieldset>
    )
};
export default FormList;

const Fieldset = styled.fieldset`
    border-bottom: 1px solid lightgrey;
    padding-bottom: 15px;
    margin-top: 15px;
    .header{
        display: flex;
        margin-bottom: 10px;
        span{
            font-size: 20px;
        }

        button{
            margin-left: 10px;
            height: initial;
        }
    }

    .items{
        display: flex;
        flex-wrap: wrap;
    }
`