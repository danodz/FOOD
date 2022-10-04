const items = require("../data/items.json");
const {callDb} = require("./dbUtils")
const {fallback} = require("../utils")

// get 3 random items for the landing page
const getRandomItems = async (req, res) => {
    const items = await callDb(async(db)=>{
        return db.collection("items").aggregate([{
                $sample: {size: 3}
            }]).toArray();
    });

    if(items) {
        res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: items
        })
    } else {
        res.status(400).json({
        status: 400,
        message: "Data not found",
        })
    }

}

// get number of items
const getNumItems = async (req, res) => {
    const filters = {};
    [
        "name",
        "price",
        "body_location",
        "category",
        "companyId"
    ].forEach((field)=>{
        const value = req.query[field];
        if(!value)
            return

        filters[field] = {
            "$regex": value,
            "$options": "i"
        }
    });

    //filter by search terms - skip - limit
    const count = await callDb(async(db)=>{
        return db.collection("items").aggregate([
            {
                '$match': filters
            },{
                '$count': "count"
            }
        ]).toArray()
    });

    if(count && count[0]) {
        res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: count[0].count,
        })
    } else {
        res.status(400).json({
        status: 400,
        message: "Data not found",
        })
    }
}

// get items by range defined by pages of 50 items 
// the page number is sent in the request 'page'
const getItems = async (req, res) => {
    const page = parseInt(req.params.page);
    const itemsPerPage = parseInt(fallback(req.query.itemsPerPage, 50));
    const orderBy = fallback(req.query.orderBy, "name");
    const orderDir = parseInt(fallback(req.query.orderDir, 1));

    const filters = {};
    [
        "name",
        "price",
        "body_location",
        "category",
        "companyId"
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
    const allItems = await callDb(async(db)=>{
        return db.collection("items").aggregate([
            {
                '$match': filters
            },
            {
                '$sort': {
                    [orderBy]: orderDir
                }
            }, {
                '$skip': page*itemsPerPage
            }, {
                '$limit': itemsPerPage
            }
        ]).toArray()
    });

    if(allItems) {
        res.status(200).json({
        status: 200,
        message: "Data retrieved successfully",
        data: allItems,
        })
    } else {
        res.status(400).json({
        status: 400,
        message: "Data not found",
        })
    }
}
// get one item by item id :item
const getItem = async (req, res) => {
    const itemId = req.params.item;

    const item = await callDb(async(db)=>{
        return await db.collection("items").findOne({_id:itemId})
    });

    if(item) {
        res.status(200).json({
            status: 200,
            message: "Data retrieved successfully",
            data: item ,
        })
    } else {
        res.status(400).json({
            status: 400,
            message: "Data not found",
        })
    }
}

module.exports = {
    getRandomItems,
    getNumItems,
    getItems,
    getItem,
}