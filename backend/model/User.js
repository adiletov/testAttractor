const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');

const newSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function () {
                if (!this.isModified('username')) return true;

                const username = await User.findOne({username: this.username});
                if (username) throw new Error(`This username: ${this.username} is already registered`);
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

newSchema.methods.generationToken = function () {
    this.token = nanoid()
};

newSchema.methods.passwordCompare = function(password){
    return bcrypt.compare(password, this.password);
};

newSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next()
});

newSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret
    }
});

const User = mongoose.model('User', newSchema);
module.exports = User;