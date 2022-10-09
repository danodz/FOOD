import styled from "styled-components";
import FormInput from "../forms/FormInput";
import FormList from "../forms/FormList";
import SelectNutrient from "../forms/SelectNutrient";
import ChooseProvider from "../forms/ChooseProvider"
import { basicFetch, objToArray } from "../../utils";
import { useContext, useEffect, useState } from "react";
import FormDisplay from "../forms/FormDisplay";
import FormHidden from "../forms/FormHidden";
import { UserContext } from "../context/UserContext";
import { Link, useSearchParams } from "react-router-dom";
import ChooseFood from "../forms/ChooseFood";
import SelectProvider from "../forms/SelectProvider";
import ImageUpload from "../ImageUpload";

const EditFood = ()=>{
  const {user} = useContext(UserContext);

  const [query, setQuery] = useSearchParams();
  const [foodToEdit, setFoodToEdit] = useState(null);

  const [nutrients, setNutrients] = useState(user.nutrients.map((nutrient)=>{return {_id:nutrient,nutrient:nutrient}}));
  const [tags, setTags] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [providers, setProviders] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [images, setImages] = useState([]);
  const onImageChange = (imageList) => {
    setImages(imageList);
  };

  const loadFood = async (_id)=>{
      const res = await basicFetch("/getFood/"+_id);
      const food = await res.json();
      setFoodToEdit(food)
      
      if(food.img){
        setImages([{data_url:food.img}])
      }
      if(food.nutrients){
        setNutrients(Object.keys(food.nutrients).map((key)=>{
            return {
              _id: key,
              nutrient: key,
              value: food.nutrients[key]
            }
        }));
      }
      if(food.tags){
        setTags(food.tags);
      }
      if(food.measures){
        setMeasures(food.measures.map((measure)=>{
          return {
            _id: measure._id,
            factorName: measure.name,
            factor: measure.factor
          }
      }))}
      if(food.providers){
        const providersData = {};
        setProviders(await Promise.all(food.providers.map(async (provider)=>{
          if(!providersData.providerId){
            const res = await basicFetch("/getProvider/"+provider.providerId);
            providersData[provider.providerId] = await res.json();
          }
          return {
            _id: provider._id,
            providerId: provider.providerId,
            name: providersData[provider.providerId].name,
            format: provider.format,
            price: provider.price,
            price100g: provider.price100g
          }
        })));
      }
      if(food.ingredients){
        const ingredientsData = {};
        setIngredients(await Promise.all(food.ingredients.map(async (ingredient)=>{
          if(!ingredientsData.foodId){
            const res = await basicFetch("/getFood/"+ingredient.foodId);
            ingredientsData[ingredient.foodId] = await res.json();
          }
          return {
            _id: ingredient._id,
            foodId: ingredient.foodId,
            amount: ingredient.amount,
            name: ingredientsData[ingredient.foodId].name,
            ingredientProviders: {
              provider: ingredient.provider,
              providers: ingredientsData[ingredient.foodId].providers.map((provider)=>{
                    return {
                        _id: provider._id,
                        name: provider.format
                    }
                })
            }
          }
      })))}
  }
  useEffect(()=>{
    if(query.has("_id")){
      loadFood(query.get("_id"))
    }
  },[])

  const submit = async (event) => {
    event.preventDefault();
    const food = {
      name: event.target.general.querySelector("input[name='name']").value,
      description: event.target.general.querySelector("input[name='description']").value,
      img: images[0].data_url,
      nutrients: {},
      tags: [],
      measures: [],
      providers: [],
      ingredients: []
    }
    if(foodToEdit)
      food._id = foodToEdit._id;
    event.target.nutrients.querySelectorAll("fieldset").forEach((nutrient)=>{
      food.nutrients[nutrient.querySelector("select").value] = nutrient.querySelector("input[name='value']").value;
    });
    event.target.tags.querySelectorAll("fieldset").forEach((tag)=>{
      food.tags.push( {
        _id: tag.querySelector("input[name='_id']").value,
        tag: tag.querySelector("input[name='tag']").value,
      })
    });
    event.target.measures.querySelectorAll("fieldset").forEach((measure)=>{
      food.measures.push( {
        _id: measure.querySelector("input[name='_id']").value,
        name: measure.querySelector("input[name='factorName']").value,
        factor: measure.querySelector("input[name='factor']").value
      })
    });
    event.target.providers.querySelectorAll("fieldset").forEach((provider)=>{
      food.providers.push({
        _id: provider.querySelector("input[name='_id']").value,
        providerId: provider.querySelector("input[name='providerId']").value,
        format: provider.querySelector("input[name='format']").value,
        price: provider.querySelector("input[name='price']").value,
        price100g: provider.querySelector("input[name='price100g']").value
      });
      
    });
    event.target.ingredients.querySelectorAll("fieldset").forEach((ingredient)=>{
      food.ingredients.push({
        _id: ingredient.querySelector("input[name='_id']").value,
        foodId: ingredient.querySelector("input[name='foodId']").value,
        provider: ingredient.querySelector("select[name='ingredientProviders']").value,
        amount: ingredient.querySelector("input[name='amount']").value,
      });
    });
    
    const res = await basicFetch("/editFood", "POST",JSON.stringify(food))
    const response = await res.json()
    console.log(response)
    if(!foodToEdit){
      query.set("_id", response.new.insertedId)
      loadFood(response.new.insertedId)
      setQuery(query)
    }
  }
  return ( <>
    <ImageUpload images={images} onChange={onImageChange} maxNumber={1}/>

    <Form onSubmit={submit}>
      <fieldset name="general">
        {foodToEdit&&<Link to={"/food/"+foodToEdit._id}>Display</Link>}
        <FormInput label="Name" name="name" defaultValue={foodToEdit&&foodToEdit.name}/>
        <FormInput label="Description" name="description" defaultValue={foodToEdit&&foodToEdit.description}/>
      </fieldset>

      <FormList name="tags" values={tags} setValues={setTags}>
        <FormInput label="Tag" name="tag"/>
      </FormList>

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

      <ChooseFood foods={ingredients} setFoods={setIngredients}/>
      <FormList name="ingredients" values={ingredients} setValues={setIngredients} noAdd={true}>
        <FormDisplay label="name" name="name"/>
        <FormHidden label="id" name="foodId"/>
        <FormInput label="Amount" name="amount"/>
        <SelectProvider name="ingredientProviders"/>
      </FormList>

      <button type="submit">Submit</button>
    </Form></>
  )
}
export default EditFood;
const Form = styled.form`
`