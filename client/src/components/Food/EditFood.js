import styled from "styled-components";
import FormInput from "./FormInput";
import FormList from "./FormList";
import SelectNutrient from "./SelectNutrient";
import { v4 } from "uuid";
import { useEffect } from "react";

const EditFood = ()=>{
  const submit = async (event) => {
    event.preventDefault();
    const food = {
      name: event.target.name.value,
      description: event.target.description.value,
      nutrients: {},
      measures: {}
    }
    const nutrients = event.target.nutrients.querySelectorAll("fieldset").forEach((nutrient)=>{
      food.nutrients[nutrient.querySelector("select").value] = nutrient.querySelector("input").value;
    });
    const measures = event.target.measures.querySelectorAll("fieldset").forEach((measure)=>{
      const id = v4();
      food.measures[id] = {
        name: measure.querySelector("input[name='factorName']").value,
        factor: measure.querySelector("input[name='factor']").value
      }
    });
    
    const res = await fetch("/editFood", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(food)
    })
    console.log(await res.json())
  };

  return (
    <Form onSubmit={submit}>
      <FormInput label="Name" name="name" />
      <FormInput label="Description" name="description" />

      <FormList name="nutrients">
          <SelectNutrient/>
          <FormInput label="Value" name="nutrient" />
      </FormList>

      <FormList name="measures">
          <FormInput label="Name" name="factorName" />
          <FormInput label="Factor" name="factor" />
      </FormList>

      <button type="submit">Submit</button>
    </Form>
  )
}
export default EditFood;
const Form = styled.form`
`