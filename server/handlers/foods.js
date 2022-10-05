const { v4: uuidv4 } = require("uuid");
const {db} = require("../db")
const {fallback} = require("../utils")

// get foods by range defined by pages of 50 items 
// the page number is sent in the request 'page'
const searchFoods = async (req, res)=>{
    const page = parseInt(req.params.page)-1;
    const itemsPerPage = parseInt(fallback(req.query.itemsPerPage, 50));
    const orderBy = fallback(req.query.orderBy, "name");
    const orderDir = parseInt(fallback(req.query.orderDir, 1));

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
    const allFoods = await db.collection("foods").aggregate([
        {
            '$match': filters,
        }, {
            "$facet": {
                total:  [{ $count: "total" }],
                foods: [
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

    if(allFoods && allFoods[0] && allFoods[0].total && allFoods[0].total[0]) {
        res.status(200).json({
            foods: allFoods[0].foods,
            nbPages: Math.ceil(allFoods[0].total[0].total/itemsPerPage)
        });
    } else {
        res.status(400).json({
            message: "no data found",
        })
    }
}

const getFood = async (req, res)=>{
    const _id = req.params._id;
    const dbRes = await db.collection("foods").findOne({_id});
    res.status(200).json(dbRes)
}

const editFood = async (req, res)=>{
    try{
    const food = req.body;
    if(!food._id)
    {
        food._id = uuidv4();
        const dbRes = await db.collection("foods").insertOne(food);
        console.log(dbRes);
        res.status(200).json(dbRes)
    }
    } catch(err){
        res.status(500).json({error: err})
        console.log(err)
    }
}

module.exports = {
    editFood,
    getFood,
    searchFoods
}