import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: String,
  description: String,
  price:{type: Number},
  images: [{type:String}],
  category: {type: mongoose.Types.ObjectId,ref:'Category'},
  properites: {type:Object},
}, {
  timeseries:true,
});

export const Product = models.Product || model('Product', ProductSchema);