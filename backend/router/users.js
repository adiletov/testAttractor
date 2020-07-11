const router = require('express').Router();
const User = require('../model/User');
const auth = require('../middleware/auth');

router.get('/', async (req,res) => {
    const users = await User.find();
    res.send(users);
})

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
    if (!user) return res.status(401).send(message);

    const isMatch = await user.passwordCompare(password);
    if (!isMatch) return res.status(401).send(message);

    try {
        await user.generationToken();
        await user.save();
        res.send({message: `You are logged in as ${user.username}`, user});
    } catch (e) {
        res.status(401).send(e)
    }
});

router.post('/changePassword', auth, async (req, res) => {
    const user = req.user;

    const isMatch = await user.passwordCompare(req.body.oldPassword);
    if (!isMatch) return  res.status(401).send({oldPassword: 'Old password in correct!!!'});
    if (!req.body.newPassword) return  res.status(401).send({newPassword: 'New password in correct!!!'});
    user.password = req.body.newPassword;

    try{
        await user.generationToken();
        await user.save();
        res.send({message: 'Change password', user})
    }catch (e) {
        res.status(401).send(e)
    }
});

router.post('/changeProfile', auth, async (req,res) => {
    const user = req.user;

    user.username = req.body.username;
    try{
        await user.generationToken();
        await user.save();
        res.send({message: 'Change username', user})
    }catch (e) {
        res.status(401).send(e)
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: 'Logout!!!'};
    const [type, token] = req.get('Authorization');

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    await user.generationToken();
    await user.save();
    res.send(success);
});



module.exports = router;