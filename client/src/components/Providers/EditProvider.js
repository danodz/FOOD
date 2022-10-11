import styled from "styled-components";
import FormInput from "../forms/FormInput";
import { basicFetch } from "../../utils";

const EditProvider = ()=>{
  const submit = async (event) => {
    event.preventDefault();
    const provider = {
      name: event.target.name.value,
      description: event.target.description.value,
    }
    
    const res = await basicFetch("/editProvider", "POST", JSON.stringify(provider))
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
  width: 300px;
`