import styled from "styled-components";
import FormInput from "../forms/FormInput";
import FormList from "../forms/FormList";
import SelectNutrient from "../forms/SelectNutrient";
import ChooseProvider from "../forms/ChooseProvider"
import { basicFetch } from "../../utils";
import { useContext, useEffect, useState } from "react";
import FormDisplay from "../forms/FormDisplay";
import FormHidden from "../forms/FormHidden";
import { UserContext } from "../context/UserContext";
import { Link, useSearchParams } from "react-router-dom";
import ChooseFood from "../forms/ChooseFood";
import SelectProvider from "../forms/SelectProvider";
import ImageUpload from "../ImageUpload";
import CNFSearch from "../CNFSearch";
import Submit from "../forms/Submit";

const EditFood = ()=>{
  const {user, loadUser} = useContext(UserContext);

  const [query, setQuery] = useSearchParams();
  const [foodToEdit, setFoodToEdit] = useState(null);
  const [defaultName, setDefaultName] = useState(null);

  const [nutrients, setNutrients] = useState(
    user.nutrients
    ?user.nutrients.map((nutrient)=>{return {_id:nutrient,nutrient:nutrient}})
    :[]
    );
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
      setDefaultName(food.name)
      
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

  const handleCnfData = (data)=>{
    setDefaultName(data.name)
    setNutrients(data.nutrients)
  }

  const submit = async (event) => {
    event.preventDefault();
    const food = {
      name: event.target.general.querySelector("input[name='name']").value,
      description: event.target.general.querySelector("input[name='description']").value,
      nutrients: {},
      tags: [],
      measures: [],
      providers: [],
      ingredients: []
    }
    if(images && images[0] && images[0].data_url)
      food.img = images[0].data_url;
    else
      food.img = ""
      
    if(foodToEdit)
      food._id = foodToEdit._id;
    event.target.nutrients.querySelectorAll("fieldset").forEach((nutrient)=>{
      const nutrientId = nutrient.querySelector("select").value;
      const nutrientValue = nutrient.querySelector("input[name='value']").value;
      if(nutrientId!=="none" && nutrientValue!=="")
        food.nutrients[nutrientId] = nutrientValue;
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
    if(!foodToEdit){
      query.set("_id", response.new.insertedId)
      loadFood(response.new.insertedId)
      setQuery(query)
      loadUser();
    }
  }

  const reset = (event)=>{
    query.delete("_id")
    setFoodToEdit(null);
    setImages([])
    setQuery(query)
    setDefaultName("");
  }

  const clearNonFavorite = ()=>{
    setNutrients(nutrients.filter((nutrient)=>{
      return user.nutrients.includes(nutrient._id.toString())
    }))
  }

  return ( <>
    <CNFSearch handleCnfData={handleCnfData}/>

    {foodToEdit&&<DisplayLink to={"/food/"+foodToEdit._id}>Display</DisplayLink>}

    <form onSubmit={submit} onReset={reset}>
      <Submit>Submit</Submit>
      <Reset type="reset">New Food</Reset>
      <General name="general">
        <FormInput required label="Name" name="name" defaultValue={defaultName&&defaultName}/>
        <FormInput label="Description" name="description" defaultValue={foodToEdit&&foodToEdit.description}/>
        <ImageUpload images={images} onChange={onImageChange} maxNumber={1}/>
      </General>
      <Line></Line>

      <FormList name="tags" values={tags} setValues={setTags}>
        <FormInput label="Tag" name="tag"/>
      </FormList>

      <button type="button" onClick={clearNonFavorite}>Clear non favorite</button>
      <FormList name="nutrients" values={nutrients} setValues={setNutrients}>
          <SelectNutrient name="nutrient"/>
          <FormInput type="number" min="0" step="any" label="Value" name="value" />
      </FormList>

      <FormList name="measures" values={measures} setValues={setMeasures}>
          <FormInput label="Name" name="factorName" />
          <FormInput type="number" min="0" step="any" label="Factor" name="factor" />
      </FormList>

      
      <FormList searchAdder={<ChooseProvider providers={providers} setProviders={setProviders}/>} name="providers" values={providers} setValues={setProviders} noAdd={true}>
        <FormDisplay label="name" name="name"/>
        <FormHidden label="id" name="providerId"/>
        <FormInput label="Buying format" name="format"/>
        <FormInput type="number" min="0" step="0.01" label="Price" name="price"/>
        <FormInput type="number" min="0" step="0.01" label="Price per 100g" name="price100g"/>
      </FormList>

      <FormList searchAdder={<ChooseFood foods={ingredients} setFoods={setIngredients}/>} name="ingredients" values={ingredients} setValues={setIngredients} noAdd={true}>
        <FormDisplay label="name" name="name"/>
        <FormHidden label="id" name="foodId"/>
        <FormInput label="Amount" name="amount"/>
        <SelectProvider name="ingredientProviders"/>
      </FormList>

      <Submit>Submit</Submit>
    </form></>
  )
}
export default EditFood;
const General = styled.fieldset`
  width: 300px;
  margin-bottom: 15px;

  >div{
    margin-bottom: 10px;
  }
`
const Line = styled.div`
  border-bottom: 1px solid lightgrey;
`

const Reset = styled.button`
    font-size: 20px;
    padding: 6px 20px;
    background: lightgray;
    border: 1px solid black;
    cursor: pointer;
    border-radius: 25px;
    margin-left: 10px;
    margin-bottom: 10px;
`

const DisplayLink = styled(Link)`
  font-size: 20px;
  padding: 6px 20px;
  background: lightgray;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 10px;
  display: inline-block;
`