const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require('fs');
const anref = require("./data/anref")

const nutrientGroups = {};
const nutrientGroupsRequest = new XMLHttpRequest();
nutrientGroupsRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientgroup/?type=json", true);
nutrientGroupsRequest.onload = (e) => {
    if (nutrientGroupsRequest.readyState === 4 && nutrientGroupsRequest.status === 200)
    {
        const groups = JSON.parse(nutrientGroupsRequest.responseText);
        for(i in groups)
        {
            const group = {}
            group.name = groups[i].nutrient_group_name;
            group.order = JSON.stringify(groups[i].nutrient_group_order);
            nutrientGroups[groups[i].nutrient_group_id] = group;
        }
        submit();
    }
}

const nutrientNames = {};
const nutrientNamesRequest = new XMLHttpRequest();
nutrientNamesRequest.open("GET", "https://aliments-nutrition.canada.ca/api/fichier-canadien-elements-nutritifs/nutrientname/?type=json", true);
nutrientNamesRequest.onload = (e) => {
    if (nutrientNamesRequest.readyState === 4 && nutrientNamesRequest.status === 200)
    {
        const names = JSON.parse(nutrientNamesRequest.responseText);
        names.sort((a, b) => (a.nutrient_web_order > b.nutrient_web_order) ? 1 : -1)

        for(i in names)
        {
            const name = names[i];
            const nutName = {
                id : JSON.stringify(name.nutrient_name_id),
                name : name.nutrient_web_name,
                unit : name.unit,
                group : JSON.stringify(name.nutrient_group_id),
                anref : {}
            };
            for(j in anref.names){
                if(anref[nutName.id])
                    nutName.anref[anref.names[j]] = JSON.stringify(anref[nutName.id][j]);
            }
            nutrientNames[nutName.id] = nutName;
        }

        submit();
    }
}

nutrientGroupsRequest.send(null);
nutrientNamesRequest.send(null);

let writeReady = 1;
const submit = async ()=>{
    if(writeReady == 0)
    {
        const nutrients = JSON.stringify({
            groups: nutrientGroups,
            names: Object.values(nutrientNames),
            anref: anref
        });
        console.log("writing")
        fs.writeFileSync("data/nutrients.json", nutrients)
        fs.writeFileSync("../client/src/data/nutrients.json", nutrients)
        console.log("done")
    }
    else
    {
        writeReady -= 1;
    }
}