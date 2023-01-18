const {db} = require("../db")
const {fallback, newFood} = require("../utils");
const { userId } = require("./users");

// get foods by range defined by pages of 50 items 
// the page number is sent in the request 'page'
const searchFoods = async (req, res)=>{
    const page = parseInt(fallback(req.query.page, 1))-1;
    const itemsPerPage = parseInt(fallback(req.query.itemsPerPage, 50));
    const orderBy = fallback(req.query.orderBy, "name");
    const orderDir = parseInt(fallback(req.query.orderDir, 1));
    const range = parseInt(fallback(req.query.range, null));

    let userIds = null;
    if(range){
        const currentUserId = userId(req);
        const currentUser = await db.collection("users").findOne({_id:currentUserId});
        const nearbyUsers = await db.collection("users").find({
            location:{
                $near: {
                $geometry: { type: 'Point', coordinates: currentUser.location.coordinates },
                $maxDistance: range*1000,
            }
        }}).toArray();
        userIds = nearbyUsers.map((user)=>user._id);
    }

    if(page < 0 || itemsPerPage <= 0){
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

    let nutrientMatches = null;
    if(req.query.nutrients){
        nutrientMatches = JSON.parse(req.query.nutrients).map((nutrient)=>{
            const key = "nutrients."+nutrient.id
            const match = {}
            match[key] = {};
            if(nutrient.minimum)
                match[key].$gte = parseInt(nutrient.minimum)
            if(nutrient.maximum)
                match[key].$lte = parseInt(nutrient.maximum)
            return match;
        });
    }
    console.log(nutrientMatches)

    //filter by search terms - sort - skip - limit
    const allFoods = await db.collection("foods").aggregate([
        {
            '$match': {$and:[
                filters,
                req.query.tags?{"tags.tag": {$all: JSON.parse(req.query.tags)}}:{},
                nutrientMatches?{$and:nutrientMatches}:{},
                userIds?{userId: {$in:userIds}}:{}
            ]}
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
                    }, {
                        '$lookup': {
                            'from': 'users', 
                            'localField': 'userId', 
                            'foreignField': '_id', 
                            'as': 'owner'
                        }
                    }, {
                        '$unwind': {
                            'path': '$owner'
                        }
                    }
                ]
            }
        }]).toArray();
    
    if(allFoods && allFoods[0] && allFoods[0].total && allFoods[0].total[0]) {
        res.status(200).json({
            results: allFoods[0].foods,
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
    const foodRes = await db.collection("foods").aggregate([
        {
            '$match': {
                '_id': _id
            }
        }, {
            '$lookup': {
                'from': 'users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'owner'
            }
        }, {
            '$unwind': {
                'path': '$owner'
            }
        }, {
            "$graphLookup":{
                from: 'foods',
                startWith: "$ingredients.foodId",
                connectFromField: 'ingredients.foodId',
                connectToField: '_id',
                as: 'ingredientsData',
            }
        }
    ]).toArray();
    const food = foodRes[0];
    if(food){
        // food.ingredientsNutritionTotal = await getIngredientsNutrition(food)
        // food.ingredientsCostTotal = await getIngredientsCost(food)
        res.status(200).json(food)
    } else {
        res.status(404).json({message: "food not found"})
    }
}

const getIngredientsCost = async(food)=>{
    let total = 0;
    if(food.ingredients){
        await Promise.all(food.ingredients.map(async (ingredient)=>{
            const food = await db.collection("foods").findOne({_id:ingredient.foodId});
            if(food){
                const provider = food.providers.find((provider)=>{
                    return provider._id === ingredient.provider
                });
                if(provider){
                    total += (provider.price100g)/100 * ingredient.amount;
                }
            }
        }));
    }
    return total;
}

const getIngredientsNutrition = async(food)=>{
    let allNutrients = {};
    const recurse = async (food)=>{
        if(food&&food.ingredients){
            await Promise.all(food.ingredients.map(async (ingredient)=>{
                const food = await db.collection("foods").findOne({_id:ingredient.foodId});
                if(food&&food.nutrients)
                    Object.keys(food.nutrients).forEach((id)=>{
                        const nutrient = food.nutrients[id];
                        if(allNutrients[id]){
                            allNutrients[id] += (nutrient/100)*ingredient.amount;
                        } else {
                            allNutrients[id] = (nutrient/100)*ingredient.amount;
                        }
                    })
                await recurse(food);
            }));
        }
    }
    await recurse(food);
    return allNutrients;
}

const editFood = async (req, res)=>{
    try{
        const food = req.body;
        let dbRes = {};
        Object.keys(food.nutrients).forEach((id)=>{
            food.nutrients[id] = parseInt(food.nutrients[id])
        })
        if(food._id){
            dbRes.original = await db.collection("foods").findOne({_id: food._id});
            dbRes.save = await db.collection("foodsHistory").updateOne({_id:food._id}, {$push: {versions: dbRes.original}})
            dbRes.new = await db.collection("foods").updateOne({_id:food._id},{$set:food});
        } else {
            const newRes = await newFood(food, userId(req));
            dbRes = newRes.dbRes;
        }
        res.status(200).json(dbRes)
    } catch(err){
        res.status(500).json({error: err})
        console.log(err)
    }
}

const getHistory = async (req, res)=>{
    const _id = req.params._id;
    const dbRes = await db.collection("foodsHistory").findOne({_id})
    await Promise.all(dbRes.versions.map(async (food)=>{
        food.ingredientsNutritionTotal = await getIngredientsNutrition(food)
        food.ingredientsCostTotal = await getIngredientsCost(food)
    }))
    res.status(200).json(dbRes)
}

module.exports = {
    editFood,
    getFood,
    searchFoods,
    getHistory
}