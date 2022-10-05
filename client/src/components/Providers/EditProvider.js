import styled from "styled-components";
import FormInput from "../forms/FormInput";
import FormList from "../forms/FormList";
import SelectNutrient from "../forms/SelectNutrient";
import { v4 } from "uuid";
import { basicFetch } from "../../utils";

const EditProvider = ()=>{
  const submit = async (event) => {
    event.preventDefault();
    const provider = {
      name: event.target.name.value,
      description: event.target.description.value,
    }
    
    const res = await basicFetch("/editProvider", "POST", JSON.stringify(provider))
    console.log(await res.json())
  };

  return (
    <Form onSubmit={submit}>
      <FormInput label="Name" name="name" />
      <FormInput label="Description" name="description" />

      <button type="submit">Submit</button>
    </Form>
  )
}
export default EditProvider;
const Form = styled.form`
`