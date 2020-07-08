const router = require('express').Router();
const User = require('../model/User');

router.post('/', async (req, res) => {
    const {username, password} = req.body;
    const user = new User({
        username,
        password
    });

    try {
        await user.generationToken();
        await user.save();
        res.send({message: 'User register success!!!', user})
    } catch (e) {
        res.status(401).send(e)
    }
});

router.post('/sessions', async (req, res) => {
    const message = {message: 'Username or password in correct'};

    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (!user) return  res.status(401).send(message);

    const isMatch = await user.passwordCompare(password);
    if (!isMatch) return  res.status(401).send(message);

    try{
        await user.generationToken();
        res.send({message: `You are logged in as ${user.username}`, user});
    }catch (e) {
        res.status(401).send(e)
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Logout!!!'};

    const token = req.get('Authorization');
    if (!token) return res.send(success);
    const user = await User.findOne({token});
    if (!user) return res.send(success);

    user.generationToken();
    await user.save();
    res.send(success);
});

module.exports = router;