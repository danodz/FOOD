//canadian nutrient file
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { v4: uuidv4 } = require("uuid");

const search = async (req, res)=>{
    const searchWords = req.params.name;
    const namesRequest = new XMLHttpRequest();
    //The api doesn't seem to have search by name functionality, so I have to load all the names
    namesRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/food/?type=json", true);
    namesRequest.onload = function (e) {
        if (namesRequest.readyState === 4 && namesRequest.status === 200)
        {
            const result = JSON.parse(namesRequest.responseText).filter((food)=>{
                return searchWords.split(" ").every((word)=>{
                    return food.food_description.toLowerCase().includes(word.toLowerCase());
                })
            }).map((food)=>{
                return {
                    name: food.food_description,
                    id: food.food_code
                }
            })
            res.status(200).json(result);
        }
    }
    namesRequest.send(null);
}

const details = async (req, res)=>{
    const id = req.params.id;
    console.log(id)
    const nutrientsRequest = new XMLHttpRequest();
    //The api doesn't seem to have search by name functionality, so I have to load all the names
    nutrientsRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientamount/?lang=en&type=json&id="+id, true);
    nutrientsRequest.onload = function (e) {
        if (nutrientsRequest.readyState === 4 && nutrientsRequest.status === 200)
        {
            const result = JSON.parse(nutrientsRequest.responseText).map((nutrient)=>{
                return {
                    _id: nutrient.nutrient_name_id,
                    nutrient: nutrient.nutrient_name_id,
                    value: nutrient.nutrient_value
                }
            })
            res.status(200).json(result);
        }
    }
    nutrientsRequest.send(null);
}

module.exports = {
    search,
    details
}