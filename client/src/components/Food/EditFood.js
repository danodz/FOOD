import validator from "@rjsf/validator-ajv6";
import Form from "@rjsf/core";
import foodSchema from "../../schemas/Food";

const EditFood = ()=>{
const uiSchema = {
  name: {
    "ui:classNames": "custom-class-name"
  },
  items: {
    "ui:widget": "textarea"
  }
}

    const onSubmit = ({formData}, e) => console.log("Data submitted: ",  formData);

    return (
    <Form onSubmit={onSubmit} schema={foodSchema} uiSchema={uiSchema} validator={validator}>
        <div>
            <button type="submit">Submit</button>
        </div>
    </Form>
    )
}
export default EditFood;