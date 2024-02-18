const Product = require('../models/productModel');
const express = require('express');
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const apiFeatures = require('../utils/apiFeatures');
const { next } = require("express");
const cloudinary = require("cloudinary");

// Create a new product (Admin)
exports.createProduct = catchAsyncError(async (req, res, next) => {
    // Handle multiple image uploads and store image links in Cloudinary
    let images = [];
    if (typeof (req.body.product_images) === "string") {
        images.push(req.body.product_images);
    } else {
        images = req.body.product_images;
    }
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        });
    }
    req.body.product_images = imagesLink;

    req.body.user = req.user.id;

    // Create a new product document in the database
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
    console.log('Product Created!');
});

// Get all products with pagination and filtering
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
    // Count total products and apply pagination and filtering
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    let apifeature = new apiFeatures(Product.find(), req.query)
        .search().filter();
    let products = await apifeature.query;
    let filteredProductCount = products.length;

    // Sort and paginate the products for homepage display
    apifeature = new apiFeatures(Product.find().sort({ createdAt: -1 }), req.query)
        .search().filter().pagination(resultPerPage);
    products = await apifeature.query;

    // Respond with the filtered products, counts, and pagination information
    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductCount
    });
    console.log('All Products Request Successful!');
});

// Get details of a single product
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler('Product Not Found!', 404));
    }

    // Respond with the details of the requested product
    res.status(200).json({
        success: true,
        product
    });
    console.log('Product Details Got Successfully!');
});

// Update a product (Admin)
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler('Product Not Found!', 404));
    }

    // Handle image updates and Cloudinary storage
    let images = [];
    if (typeof (req.body.product_images) === "string") {
        images.push(req.body.product_images);
    } else {
        images = req.body.product_images;
    }

    if (images !== undefined) {
        for (let i = 0; i < product.product_images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.product_images[i].public_id);
        }

        const imagesLink = [];
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "medicines"
            });
            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        }
        req.body.product_images = imagesLink;
    }

    // Update the product and respond with the updated product details
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });
    console.log('Product Updated!');
});

// Delete a product (Admin)
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new errorHandler('Product Not Found!', 404));
    }

    // Delete images from Cloudinary and delete the product document
    for (let i = 0; i < product.product_images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.product_images[i].public_id);
    }

    await product.deleteOne();

    // Respond with success status and message
    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully!"
    });
    console.log('Product Deleted Successfully!');
});

// Get all products for Admin view
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
    // Retrieve all products for Admin view
    const products = await Product.find();

    // Respond with the list of products
    res.status(200).json({
        success: true,
        products,
    });
    console.log('Admin Products Request Successful!');
});
