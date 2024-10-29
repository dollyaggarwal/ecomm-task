import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  inCart: {
    type: Boolean,
    default: false,
  },
  cartQuantity: {
    type: Number,
    default: 0,
  },
  productImage: {
    type: String, // Store the image URL or path
    required: true, // or not depending on your requirements
},
},{ timestamps: true });

const Product = mongoose.model("products", productSchema);

export default Product;
