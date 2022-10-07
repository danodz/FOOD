import styled from "styled-components";
import FormInput from "../forms/FormInput";
import FormList from "../forms/FormList";
import SelectNutrient from "../forms/SelectNutrient";
import ChooseProvider from "../forms/ChooseProvider"
import { v4 } from "uuid";
import { basicFetch, objToArray } from "../../utils";
import { useContext, useEffect, useState } from "react";
import FormDisplay from "../forms/FormDisplay";
import FormHidden from "../forms/FormHidden";
import { UserContext } from "../context/UserContext";
import { useSearchParams } from "react-router-dom";

const EditFood = ()=>{
  const {user} = useContext(UserContext);

  const [query] = useSearchParams();
  const [foodToEdit, setFoodToEdit] = useState(null);

  const loadFood = async (_id)=>{
      const res = await basicFetch("/getFood/"+_id);
      const food = await res.json();
      setFoodToEdit(food)
      
      if(food.nutrients){
        setNutrients(Object.keys(food.nutrients).map((key)=>{
            return {
              _id: key,
              nutrient: key,
              value: food.nutrients[key]
            }
        }));
      }
      if(food.measures)
        setMeasures(Object.keys(food.measures).map((key)=>{
          const measure = food.measures[key];
          return {
            _id: key,
            factorName: measure.name,
            factor: measure.factor
          }
        }))
      if(food.providers){
        const newProviders = [];
        Object.values(food.providers).forEach((list)=>{
          list.forEach((provider) => {
            newProviders.push({
              _id: v4(),
              providerId: provider._id,
              name: provider.name,
              format: provider.format,
              price: provider.price,
              price100g: provider.price100g
            })
          });
        });
        setProviders(newProviders);
      }
  }

  useEffect(()=>{
    if(query.has("_id")){
      loadFood(query.get("_id"))
    }
  },[])

  const [nutrients, setNutrients] = useState(user.nutrients.map((nutrient)=>{return {_id:nutrient,nutrient:nutrient}}));
  const [measures, setMeasures] = useState([]);
  const [providers, setProviders] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const food = {
      name: event.target.general.querySelector("input[name='name']").value,
      description: event.target.general.querySelector("input[name='description']").value,
      nutrients: {},
      measures: {},
      providers: {}
    }
    if(foodToEdit)
      food._id = foodToEdit._id;
    event.target.nutrients.querySelectorAll("fieldset").forEach((nutrient)=>{
      food.nutrients[nutrient.querySelector("select").value] = nutrient.querySelector("input").value;
    });
    event.target.measures.querySelectorAll("fieldset").forEach((measure)=>{
      const _id = v4();
      food.measures[_id] = {
        name: measure.querySelector("input[name='factorName']").value,
        factor: measure.querySelector("input[name='factor']").value
      }
    });
    event.target.providers.querySelectorAll("fieldset").forEach((provider)=>{
      const providerData = {
        name: provider.querySelector("input[name='name']").value,
        _id: provider.querySelector("input[name='providerId']").value,
        format: provider.querySelector("input[name='format']").value,
        price: provider.querySelector("input[name='price']").value,
        price100g: provider.querySelector("input[name='price100g']").value
      }
      if(!food.providers[providerData._id])
        food.providers[providerData._id] = []
      food.providers[providerData._id].push(providerData);
    });
    
    const res = await basicFetch("/editFood", "POST",JSON.stringify(food))
    const response = await res.json()
  }

  return (
    <Form onSubmit={submit}>
      <fieldset name="general">
        <FormInput label="Name" name="name" defaultValue={foodToEdit&&foodToEdit.name}/>
        <FormInput label="Description" name="description" defaultValue={foodToEdit&&foodToEdit.description}/>
      </fieldset>

      <FormList name="nutrients" values={nutrients} setValues={setNutrients}>
          <SelectNutrient name="nutrient"/>
          <FormInput label="Value" name="value" />
      </FormList>

      <FormList name="measures" values={measures} setValues={setMeasures}>
          <FormInput label="Name" name="factorName" />
          <FormInput label="Factor" name="factor" />
      </FormList>

      <ChooseProvider providers={providers} setProviders={setProviders}/>
      <FormList name="providers" values={providers} setValues={setProviders} noAdd={true}>
        <FormDisplay label="name" name="name"/>
        <FormHidden label="id" name="providerId"/>
        <FormInput label="Buying format" name="format"/>
        <FormInput label="Price" name="price"/>
        <FormInput label="Price per 100g" name="price100g"/>
      </FormList>

      <button type="submit">Submit</button>
    </Form>
  )
}
export default EditFood;
const Form = styled.form`
`