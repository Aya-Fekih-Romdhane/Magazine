const mongoose=require('mongoose');
const schema = new mongoose.Schema({
 	name: String 
},{
	timestamps:true
});

const Category = mongoose.model('Category', schema);
module.exports = Category;