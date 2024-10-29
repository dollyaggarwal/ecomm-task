import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productImage: {
    public_id: String,   // Stores the Cloudinary public ID
    url: String,         // Stores the URL of the image
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const Product = mongoose.model("products", productSchema);

export default Product;
