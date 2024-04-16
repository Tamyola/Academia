const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AcadSchema = new Schema({
   email:{
    type:String,
    required: true
   },
   username:{
    type:String,
    required: true
   },
   password:{
    type:String,
    required: true
   }
});

const Acad = mongoose.model('Acad', AcadSchema);

module.exports = Acad;