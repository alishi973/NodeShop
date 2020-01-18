let Categories=require("../models/category")
module.exports=(Express)=>{
    let router = Express.Router();
    router.get('/', async (req, res) => {
        /*TODO:Get HighSale Item From DB*/
        const categories=await Categories.find({}).limit(7).sort({ _id: -1 });


        res.render('index', {categories});
    });


    return router;
}