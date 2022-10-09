import FoodListItem from "./FoodListItem";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";

const SearchFoods = ()=>{
    return (
        <>
            <SearchForm/>
            <SearchResults url="/searchFoods" fields={["name", "description", "itemsPerPage", "nutrients", "tags"]}>
                <FoodListItem/>
            </SearchResults>
        </>
    )
}
export default SearchFoods;