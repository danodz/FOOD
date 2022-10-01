const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const { v4: uuidv4 } = require("uuid");
const anref = require("./data/anref")
const {db} = require("./db")
var foods = {};
var nutrientNames = {};
var writeReady = 3;

//getting foods names by id
var foodRequest = new XMLHttpRequest();
foodRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/food/?lang=fr&type=json", true);
foodRequest.onload = function (e) {
    if (foodRequest.readyState === 4 && foodRequest.status === 200)
    {
        var foodData = JSON.parse(foodRequest.responseText);
        for(var i = 0; i<foodData.length; i++)
        {
            foods[foodData[i].food_code] = {
                _id: uuidv4(),
                name : foodData[i].food_description,
                description: "",
                img: "",
                nutrients:{},
                measures:{},
                providers: {},
                tags: [],
                foods: {}
            };
        }
        nutrientsRequest.send(null);
        measureRequest.send(null);
        console.log("fcen done");
    }
}

var nutrientsRequest = new XMLHttpRequest();
nutrientsRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientamount/?lang=fr&type=json", true);
nutrientsRequest.onload = function (e) {
    if (nutrientsRequest.readyState === 4 && nutrientsRequest.status === 200)
    {
        var nutData = JSON.parse(nutrientsRequest.responseText);
        for(var i = 0; i<nutData.length; i++)
        {
            foods[nutData[i].food_code].nutrients[nutData[i].nutrient_name_id] = nutData[i].nutrient_value;
        }
        console.log("nutrients done");
        submit();
    }
}

var measureRequest = new XMLHttpRequest();
measureRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/servingsize/?lang=fr&type=json", true);
measureRequest.onload = function (e) {
    if (measureRequest.readyState === 4 && measureRequest.status === 200)
    {
        var measures = JSON.parse(measureRequest.responseText);
        for(var i = 0; i<measures.length; i++)
        {
            if( measures[i].conversion_factor_value != 0)
                foods[measures[i].food_code].measures[uuidv4()] = {name: measures[i].measure_name, factor: measures[i].conversion_factor_value * 100};
        }
        console.log("measure done");
        submit();
    }
}

var nutrientGroups = {};
var nutrientGroupsRequest = new XMLHttpRequest();
nutrientGroupsRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientgroup/?lang=fr&type=json", true);
nutrientGroupsRequest.onload = function (e) {
    if (nutrientGroupsRequest.readyState === 4 && nutrientGroupsRequest.status === 200)
    {
        var groups = JSON.parse(nutrientGroupsRequest.responseText);
        for(i in groups)
        {
            var group = {}
            group.name = groups[i].nutrient_group_name;
            group.order = groups[i].nutrient_group_order;
            nutrientGroups[groups[i].nutrient_group_id] = group;
        }
        submit();
    }
}

var nutrientNames = {};
var nutrientNamesRequest = new XMLHttpRequest();
nutrientNamesRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientname/?lang=fr&type=json", true);
nutrientNamesRequest.onload = function (e) {
    if (nutrientNamesRequest.readyState === 4 && nutrientNamesRequest.status === 200)
    {
        var names = JSON.parse(nutrientNamesRequest.responseText);
        names.sort((a, b) => (a.nutrient_web_order > b.nutrient_web_order) ? 1 : -1)

        for(i in names)
        {
            var name = names[i];
            var nutName = {
                id : name.nutrient_name_id,
                name : name.nutrient_web_name,
                unit : name.unit,
                group : name.nutrient_group_id,
                anref : {}
            };
            for(j in anref.names){
                if(anref[nutName.id])
                    nutName.anref[anref.names[j]] = anref[nutName.id][j]
            }
            nutrientNames[nutName.id] = nutName;
        }

        submit();
    }
}

nutrientGroupsRequest.send(null);
nutrientNamesRequest.send(null);
foodRequest.send(null);

const submit = async ()=>{
    if(writeReady == 0)
    {
        await db.collection("foods").deleteMany({});
        const res = await db.collection("foods").insertMany(Object.values(foods));
        console.log("Foods added to database")
        const nutrients = JSON.stringify({
            groups: nutrientGroups,
            names: nutrientNames,
            anref: anref
        });
        fs.writeFile("data/nutrients.json", nutrients, () => {console.log("server nutrients.json")})
        fs.writeFile("../client/data/nutrients.json", nutrients, () => {console.log("client nutrients.json")})
        return;
    }
    else
    {
        writeReady -= 1;
    }
}