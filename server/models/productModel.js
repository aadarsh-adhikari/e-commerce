import mongoose, { Mongoose } from "mongoose";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    lowercase:true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'category',
    required:true
  },
  quantity:{
   type:Number,
   required:true
  },
  pagenumber:{
    type:Number,
    required:true
   },
  photo:{
    data: Buffer,
    contentType:String
  },
  shipping:{
    type:Boolean,
  }
},{timestamps:true});

export default mongoose.model('product', productSchema)
