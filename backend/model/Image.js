const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const newSchema = new Schema({
   category_id: {
       type: Schema.Types.ObjectID,
       ref: 'Category',
       required: true
   },
   userId: {
       type: Schema.Types.ObjectID,
       ref: 'User',
       required: true
   },
   title: {
       type: String,
       required: true
   },
   description: {
       type: String,
       required: true
   },
   image: {
       type: String,
       required: true
   }
});

const Image = mongoose.model('Image', newSchema);
module.exports = Image;