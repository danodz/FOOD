import nutrients from "../../data/nutrients.json"

const SelectNutrient = ()=>{
    return (
        <select>
            <option value="none">Pick a nutrient</option>
            {nutrients.names.map((nutrient)=>{
                return <option key={nutrient.id} value={nutrient.id}>{nutrient.name}</option>
            })}
        </select>
    )
}
export default SelectNutrient;