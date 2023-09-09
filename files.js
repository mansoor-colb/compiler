const mongoose =require("mongoose") 
const { Bool } = require("mongoose/lib/schema/index")
const arr=mongoose.Schema({
    input:{
        type: String,
        // required: true,
        trim: true,
        }
})
const userschema =mongoose.Schema({
user_id:{
type: String,
required: true,
trim: true,
},   
file_id: {
    type: String,
    required: true,
    trim: true,}
    , 
file_name: {
type: String,
required: true,
trim: true,}
,
language: {
type: String,
required: true,
trim: true,
},
input: arr
})
const usercode = mongoose.model("user_codes",userschema)
module. exports= usercode