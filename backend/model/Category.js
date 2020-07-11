const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
   title: {
       type: String,
       required: true,
       validate: {
           validator:async function () {
                const title = await Category.findOne({title: this.title});
                if (title) throw new Error('This is category already created')
           }
       }
   }
});

const Category = mongoose.model('Category', newSchema);
module.exports = Category;