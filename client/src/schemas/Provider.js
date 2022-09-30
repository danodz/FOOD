const types = require("./types");

const providerSchema = {
    "title": "Provider",
    "type": "object",
    "required": [
    ],
    "properties": {
        name:{
            type: string
        },
        bio:{
            type: string
        },
        location:{
            type: string
        },
    }
}