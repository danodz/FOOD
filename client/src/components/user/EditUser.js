import styled from "styled-components";
import { useContext, useState } from "react";
import {UserContext} from "../context/UserContext";
import FormList from "../forms/FormList";
import FormInput from "../forms/FormInput";
import SelectNutrient from "../forms/SelectNutrient";
import { basicFetch } from "../../utils";

const EditUser = ()=>{
    const {user} = useContext(UserContext)
    const [favNutrients, setFavNutrients] = useState(
        user.nutrients
        ?user.nutrients.map((nutrient)=>{return {_id:nutrient,nutrient:nutrient}})
        :[]
        );

    const submitNutrients = (event)=>{
        event.preventDefault();
        const fields = event.target;
        const update = {
            name: fields.name.value,
            address: fields.address.value,
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
                <FormInput label="Address:" name="address" defaultValue={user.address}/>
                <FormList name="favoriteNutrients" values={favNutrients} setValues={setFavNutrients}>
                    <SelectNutrient name="nutrient"/>
                </FormList>
                <button type="submit">Submit</button>
            </form>
        </Wrapper>
    )
}
export default EditUser;

const Wrapper=styled.div`
`