const { v4: uuidv4 } = require("uuid");
const {db} = require("../db")
const {fallback} = require("../utils")

// get foods by range defined by pages of 50 items 
// the page number is sent in the request 'page'
const searchProviders = async (req, res)=>{
    const page = parseInt(req.params.page)-1;
    const itemsPerPage = parseInt(fallback(req.query.itemsPerPage, 50));
    const orderBy = fallback(req.query.orderBy, "name");
    const orderDir = parseInt(fallback(req.query.orderDir, 1));

    if(page <= 0 || itemsPerPage >= 0){
        return res.status(400).json({
            message: "Invalid request",
        })
    }

    const filters = {};
    [
        "name",
        "description",
    ].forEach((field)=>{
        const value = req.query[field];
        if(!value)
            return

        filters[field] = {
            "$regex": value,
            "$options": "i"
        }
    });

    //filter by search terms - sort - skip - limit
    const allProviders = await db.collection("providers").aggregate([
        {
            '$match': filters,
        }, {
            "$facet": {
                total:  [{ $count: "total" }],
                providers: [
                    {
                        '$sort': {
                        [orderBy]: orderDir
                        }
                    }, {
                        '$skip': page*itemsPerPage
                    }, {
                        '$limit': itemsPerPage
                    }
                ]
            }
        }]).toArray();

    if(allProviders && allProviders[0] && allProviders[0].total && allProviders[0].total[0]) {
        res.status(200).json({
            foods: allProviders[0].providers,
            nbPages: Math.ceil(allProviders[0].total[0].total/itemsPerPage)
        });
    } else {
        res.status(400).json({
            message: "no data found",
        })
    }
}

const getProvider = async (req, res)=>{
    const _id = req.params._id;
    const dbRes = await db.collection("providers").findOne({_id});
    res.status(200).json(dbRes)
}

const editProvider = async (req, res)=>{
    try{
    const provider = req.body;
    if(!provider._id)
    {
        provider._id = uuidv4();
        const dbRes = await db.collection("providers").insertOne(provider);
        res.status(200).json(dbRes)
    }
    } catch(err){
        res.status(500).json({error: err})
        console.log(err)
    }
}

module.exports = {
    editProvider,
    getProvider,
    searchProviders
}