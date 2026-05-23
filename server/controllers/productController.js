import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

/**
 * @desc    Create a product (Admin only)
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = new Product({
        name: name || "Sample Name",
        price: price || 0,
        user: req.user._id,
        image: image || "/images/sample.jpg",
        brand: brand || "Sample Brand",
        category: category || "Sample Category",
        countInStock: countInStock || 0,
        numReviews: 0,
        description: description || "Sample Description",
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

/**
 * @desc    Update a product (Admin only)
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.image = image || product.image;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

/**
 * @desc    Delete a product (Admin only)
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

/**
 * @desc    Update product stock (Public)
 * @route   PATCH /api/products/:id/stock
 * @access  Public
 */
const updateProductStock = asyncHandler(async (req, res) => {
    const { qty } = req.body; // qty can be positive (to restore) or negative (to decrease)
    const product = await Product.findById(req.params.id);

    if (product) {
        product.countInStock = Math.max(0, product.countInStock + qty);
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    updateProductStock,
};
