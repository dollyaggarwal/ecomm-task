// controllers/productController.js
import Product from "../models/products.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";



export const addProduct = async (req, res) => {
  try {
      const { name, description, price, category } = req.body;

      // Validate required fields
      if (!name || !description || !price || !category ) {
          return res.status(400).json(new ApiError(400, "All fields are required."));
      }

      const productLocalPath = req.files?.productImage[0]?.path;
      
      if (!productLocalPath) {
        throw new ApiError(400, "Product Image is required");
      }
      const productImage = await cloudinaryUploading(productLocalPath, "products");
     
      if (!productImage) {
        throw new ApiError(400, "Products file is required");
      }

      // Create a new product
      const newProduct = new Product({
          name,
          description,
          price,
          category,
          productImage: {
            public_id: productImage.public_id,
            url: productImage.url,
          },
      });

      // Save the product to the database
      await newProduct.save();

      res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully"));
  } catch (error) {
      throw new ApiError(500, "Error adding product", error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products, "products")
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching products", error);
  }
};
export const addToCart = async (req, res) => {
    try {
      const { productId, quantity } = req.body;
  
      // Validate if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        throw new ApiError(404, "Product not found");
      }
  
      // Update the product's cart status and quantity
      product.inCart = true;
      product.cartQuantity = quantity;
      await product.save();
  
      res.status(200).json(new ApiResponse(200, product, "Product added to cart successfully"));
    } catch (error) {
      throw new ApiError(500, "Error adding product to cart", error);
    }
  };
