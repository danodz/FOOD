import nutrients from "../../data/nutrients.json"

const DisplayNutrient = ({id, value})=>{
    const nutrient = nutrients.names.find((nutrient)=>{
        return nutrient.id == id;
    })
    return (<>
        <div>
            {nutrient.name}
        </div>
        <div>
            {Math.round(value)}
            {nutrient.unit}
        </div>
    </>)
}
export default DisplayNutrient;