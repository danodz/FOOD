import styled from "styled-components";
import { useContext } from "react";
import {UserContext} from "../context/UserContext";
import FormList from "../forms/FormList";
import FormInput from "../forms/FormInput";
import { basicFetch } from "../../utils";

const EditUser = ()=>{
    const {user} = useContext(UserContext)

    const submitNutrients = (event)=>{
        event.preventDefault();
        const fields = event.target;
        const update = {
            name: fields.name.value,
            nutrients: []
        }
        event.target.querySelectorAll("select").forEach((select)=>{
            if(select.value !== "none")
                update.nutrients.push(select.value)
        })
        basicFetch("/updateUser", "PATCH", JSON.stringify(update))
    }
    return (
        <Wrapper>
            <form onSubmit={submitNutrients}>
                <FormInput label="Name:" name="name" defaultValue={user.name}/>
                <FormList name="favoriteNutrients" defaultValues={user.nutrients.map((nutrient)=>{return {nutrient:nutrient}})}>
                    <FormInput name="nutrient"/>
                </FormList>
                <button type="submit">Submit</button>
            </form>
        </Wrapper>
    )
}
export default EditUser;

const Wrapper=styled.div`
`