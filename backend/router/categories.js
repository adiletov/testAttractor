const router = require('express').Router();
const auth = require('../middleware/auth');
const Category = require('../model/Category');

router.post('/', auth, async (req,res) => {
    const user = req.user;
    if (!user) res.status(401).send('you do not have permission to add a category');
    const {title} = req.body;

    const category = new Category({title});

    try{
        await category.save();
        res.send({message: 'Added category success!!!'})
    }catch (e) {
        res.status(401).send(e)
    }
});

router.get('/', async (req,res) => {
   const categories = await Category.find();

   res.send(categories)
});

module.exports = router;