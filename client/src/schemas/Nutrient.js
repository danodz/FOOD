const types = require("./types");

const nutrientSchema = {
    "title": "Nutrient",
    "type": "object",
    "required": [
    ],
    "properties": {
        _id: {
            type: string
        },
        name: {
            type: string
        },
        unit: {
            type: string
        },
        anref: {
            type: types.object,
            properties: {
                "0-6 mois": {
                    type: types.number
                },
                "7-12 mois": {
                    type: types.number
                },
                "1-3 ans": {
                    type: types.number
                },
                "4-8 ans": {
                    type: types.number
                },
                "Homme 9-13 ans": {
                    type: types.number
                },
                "Homme 14-18 ans": {
                    type: types.number
                },
                "Homme 19-30 ans": {
                    type: types.number
                },
                "Homme 31-50 ans": {
                    type: types.number
                },
                "Homme 51-70 ans": {
                    type: types.number
                },
                "Homme &gt;70 ans": {
                    type: types.number
                },
                "Femme 9-13 ans": {
                    type: types.number
                },
                "Femme 14-18 ans": {
                    type: types.number
                },
                "Femme 19-30 ans": {
                    type: types.number
                },
                "Femme 31-50 ans": {
                    type: types.number
                },
                "Femme 51-70 ans": {
                    type: types.number
                },
                "Femme &gt;70 ans": {
                    type: types.number
                },
                "Grossesse &lt; 18 ans": {
                    type: types.number
                },
                "Grossesse 19-30 ans": {
                    type: types.number
                },
                "Grossesse 31-50 ans": {
                    type: types.number
                },
                "Lactation &lt; 18 ans": {
                    type: types.number
                },
                "Lactation 19-30 ans": {
                    type: types.number
                },
                "Lactation 31-50 ans": {
                    type: types.number
                }
            }
        }
    }
}