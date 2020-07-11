const path = require('path');
const router = require('express').Router();
const multer = require('multer');
const config = require('../config');
const {nanoid} = require('nanoid');
const auth = require('../middleware/auth');
const Image = require('../model/Image');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

router.post('/', auth, upload.single('image'), async (req, res) => {
    if (!req.file) res.status(401).send({error: 'No image'})
    const {title, description, category_id} = req.body;

    const image = new Image({
        userId: req.user._id,
        category_id,
        title,
        description,
        image: req.file.filename
    });

    try {
        await image.save();
        res.send({message: 'Add image'})
    } catch (e) {
        res.status(401).send(e)
    }
});


router.get('/', async (req, res) => {
    const images = await Image.find();
    res.send(images)
});

router.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(401).send('NO category id')
    }
    const images = await Image.find({category_id: req.params.id});
    res.send(images)
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id);
    if (!req.params.id) {
        res.status(401).send('NO image id')
    }
    await Image.deleteOne({_id : req.params.id});
    res.send({message: 'Remove image success!!!'});
});

module.exports = router;