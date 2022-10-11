import styled from "styled-components";
import { useContext, useState } from "react";
import {UserContext} from "../context/UserContext";
import FormList from "../forms/FormList";
import FormInput from "../forms/FormInput";
import SelectNutrient from "../forms/SelectNutrient";
import { basicFetch } from "../../utils";
import Submit from "../forms/Submit"

const EditUser = ()=>{
    const {user, loadUser} = useContext(UserContext)
    const [favNutrients, setFavNutrients] = useState(
        user.nutrients
        ?user.nutrients.map((nutrient)=>{return {_id:nutrient,nutrient:nutrient}})
        :[]
        );

    const submitNutrients = async (event)=>{
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
        await basicFetch("/updateUser", "PATCH", JSON.stringify(update))
        loadUser();
    }
    return (
        <form onSubmit={submitNutrients}>
            <Submit>Submit</Submit>
            <General>
                <FormInput label="Name:" name="name" defaultValue={user.name}/>
                <FormInput label="Address:" name="address" defaultValue={user.address}/>
            </General>
            <FormList name="favoriteNutrients" values={favNutrients} setValues={setFavNutrients}>
                <SelectNutrient name="nutrient"/>
            </FormList>
            <Submit>Submit</Submit>
        </form>
    )
}
export default EditUser;

const General=styled.div`
    width: 300px;
`