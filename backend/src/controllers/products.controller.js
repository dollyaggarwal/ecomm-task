// controllers/productController.js
import Product from "../models/products.model.js";
import Cart from '../models/cart.model.js';
import Wishlist from '../models/wishlist.model.js';
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
    res.status(200).json(new ApiResponse(200, products, "Products fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching products", error);
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Ensure req.user contains the user ID after authentication
    const { productId, quantity } = req.body;

    // Validate if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    // Find or create the cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.equals(productId));
    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity if already in cart
    } else {
      cart.items.push({ productId, quantity }); // Add new item to cart
    }

    await cart.save();
    res.status(200).json(new ApiResponse(200, cart, 'Product added to cart successfully'));
  } catch (error) {
    throw new ApiError(500, 'Error adding product to cart', error);
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id; // Assumes req.user is populated with the user's ID
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], 'No items in cart'));
    }

    res.status(200).json(new ApiResponse(200, cart.items, 'Cart items fetched successfully'));
  } catch (error) {
    throw new ApiError(500, 'Error fetching cart items', error);
  }
};

// Function to add an item to the wishlist
export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request
    const { productId } = req.body; // Get product ID from the request body

    // Validate if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, 'Product not found');
    }

    // Find or create the wishlist for the user
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    // Check if the product is already in the wishlist
    const existingItem = wishlist.items.find(item => item.productId.equals(productId));
    if (!existingItem) {
      wishlist.items.push({ productId }); // Add new item to wishlist
      await wishlist.save();
      const eventEmitter = req.app.get("eventEmitter");
            eventEmitter.emit("wishlistUpdated", wishlist);
    }

    res.status(200).json(new ApiResponse(200, wishlist, 'Product added to wishlist successfully'));
  } catch (error) {
    throw new ApiError(500, 'Error adding product to wishlist', error);
  }
};

// Function to get all items in the user's wishlist
export const getUserWishlist = async (req, res) => {
  try {
    const userId = req.user._id; // Get the user ID from the request
    const wishlist = await Wishlist.findOne({ userId }).populate('items.productId');

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(200).json(new ApiResponse(200, [], 'No items in wishlist'));
    }

    res.status(200).json(new ApiResponse(200, wishlist.items, 'Wishlist items fetched successfully'));
  } catch (error) {
    throw new ApiError(500, 'Error fetching wishlist items', error);
  }
};

