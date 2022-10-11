import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import FormInput from "../forms/FormInput";
import SelectNutrient from "../forms/SelectNutrient";
import FormList from "../forms/FormList";
import { useState } from "react";
import Submit from "../forms/Submit";

const SearchForm = ()=>{
    const [query, setQuery] = useSearchParams()

    const [tags, setTags] = useState([])
    const [nutrients, setNutrients] = useState([])

    const submit = (event)=>{
        event.preventDefault();
        const el = event.target;
        new Set(query.entries()).forEach((entry)=>{
            query.delete(entry[0]);
        })
        if(el.name.value!="")
            query.set("name", el.name.value)
        if(el.description.value!="")
            query.set("description", el.description.value)
        if(el.itemsPerPage.value!="")
            query.set("itemsPerPage", el.itemsPerPage.value)
        if(el.range.value!="")
            query.set("range", el.range.value)

        const tags = [];
        el.tags.querySelectorAll("fieldset").forEach((tag)=>{
            tags.push(tag.querySelector("input[name='tag']").value)
        });
        if(tags.length!=0)
            query.set("tags", JSON.stringify(tags))

        const nutrients = [];
        el.nutrients.querySelectorAll("fieldset").forEach((nutrient)=>{
            nutrients.push({
                id:nutrient.querySelector("select[name='id']").value,
                minimum:nutrient.querySelector("input[name='minimum']").value,
                maximum:nutrient.querySelector("input[name='maximum']").value,
            });
        });
        if(nutrients.length!=0)
            query.set("nutrients", JSON.stringify(nutrients))

        setQuery(query)
    }
    return (
        <>
            <form onSubmit={submit}>
                <General>
                    <FormInput label="Name of the food contains" name="name"/>
                    <FormInput label="Description of the food contains" name="description"/>
                    <FormInput label="Items per page" name="itemsPerPage"/>
                    <FormInput label="Max distance with food's creator (km)" name="range"/>
                </General>
                <FormList name="tags" values={tags} setValues={setTags}>
                    <FormInput label="Tag" name="tag"/>
                </FormList>
                <FormList name="nutrients" values={nutrients} setValues={setNutrients}>
                    <SelectNutrient label="Nutrients" name="id"/>
                    <FormInput label="Minimum" name="minimum"/>
                    <FormInput label="Maximum" name="maximum"/>
                </FormList>
                <Submit>Submit</Submit>
            </form>
        </>
    )
}
export default SearchForm;

const General = styled.div`
    width: 500px;
    div{
        margin-bottom: 10px;
    }
`