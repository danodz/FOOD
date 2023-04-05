import nutrients from "../../data/nutrients.json"
import Select from "react-select"
import { fontSize, height, padding } from "@mui/system";

const SelectNutrient = ({name, defaultValue})=>{
    const options = nutrients.names.map((nutrient)=>{
                return {value: nutrient.id, label: nutrient.name};
            })

    const defaultIndex = options.findIndex((option)=>{
        return option.value === defaultValue
    })

    const styles = {
        control: (css) => ({
            ...css,
            width: 350,
            height: 45,
        }),
        indicatorSeparator: (css) => ({
            ...css,
            background:"none"
        }),
        input: (css) => ({
            ...css,
            marginBottom: 10
        }),
    };

    return (
        <Select styles={styles} name={name?name:""} defaultValue={defaultValue?options[defaultIndex]:null} options={options}/>
    )
}
export default SelectNutrient;