import { useNavigate, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import FormInput from "./FormInput";

const SearchForm = ()=>{
    const [query, setQuery] = useSearchParams()
    const submit = (event)=>{
        event.preventDefault();
        const el = event.target.elements;
        const formData = {
            name: el.name.value,
        };
        setQuery(formData)
    }
    return (
        <>
            <form onSubmit={submit}>
                <FormInput label="Name of the food contains" name="name" defaultValue={query.get("name")}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}
export default SearchForm;