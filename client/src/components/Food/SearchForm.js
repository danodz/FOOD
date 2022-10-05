import { useSearchParams } from "react-router-dom";
import FormInput from "../forms/FormInput";

const SearchForm = ()=>{
    const [query, setQuery] = useSearchParams()
    const submit = (event)=>{
        event.preventDefault();
        const el = event.target.elements;
        query.delete("page")
        query.set("name", el.name.value)
        setQuery(query)
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