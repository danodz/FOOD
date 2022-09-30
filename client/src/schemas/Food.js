import * as types from "./types"

const foodSchema = {
    "title": "FOOD",
    "type": "object",
    "required": [
    ],
    "properties": {
    name: {
        type: types.string
    },
    description: {
        type: types.string
    },
    image: {
        type: types.string
    },
    weightFactor: {
        type: types.string
    },
    nutrients: {
        type: types.array,
        items: {
            type: types.object,
            properties: {
                _id: {
                    type: types.string
                },
                value:{
                    type: types.number
                }
            }
        }
        
    },
    providers: {
        type: types.array,
        items: {
            type: types.object,
            properties: {
                id: {
                    type: types.string,
                },
                price: {
                    type: types.number
                },
                formatValue: {
                    type: types.number
                },
                formatName: {
                    type: types.string
                },
                formatTo100g: {
                    type: types.number
                }
            }
        }
    },
    tags: {
        type: types.array,
        items: {
            type: types.string
        }
    },
    foods: {
        type: types.array,
        items: {
            type: types.object,
            properties: {
                food: {
                    type: types.string
                },
                amount: {
                    type: types.string
                },
                provider: {
                    type: types.string
                },
            }
        }
    }
}}

export default foodSchema;