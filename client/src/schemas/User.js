userSchema = {
    "title": "User",
    "type": "object",
    "required": [
    ],
    "properties": {
        name:{
            type: string
        },
        anref:{
            type: string
        },
        bio:{
            type: string
        },
        location:{
            type: string
        },
        foods: {
            type: types.array,
            items: {
                types: string
            }
        },
        defaultNutrients: {
            type: types.array,
            items: {
                types: string
            }
        },
    }
}