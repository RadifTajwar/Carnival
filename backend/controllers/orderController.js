const Order = require('../models/orderModel');
const errorHandler = require("../utils/errorHandler");
const catchAsyncError = require('../middleware/catchAsyncError');
const Product = require('../models/productModel');
const User = require('../models/userModel');

// Create a new order
exports.newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Create a new order document in the database
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    console.log('New Order Created!');

    // Respond with a success status and the newly created order
    res.status(201).json({
        success: true,
        order
    });
});

// Get details of a single order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (!order) {
        return next(new errorHandler('Order not Found with this ID', 404));
    }

    // Respond with the requested order details
    res.status(200).json({
        success: true,
        order
    });
});

// Get orders of the logged-in user
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    // Respond with the orders belonging to the logged-in user
    res.status(200).json({
        success: true,
        orders
    });
});

// Get all orders (Admin)
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    // Respond with a list of all orders and the total amount
    res.status(200).json({
        success: true,
        totalAmount,
        orders
    });
});

// Update order status (Admin)
exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new errorHandler('Order not Found with this ID', 404));
    }

    if (order.orderStatus === 'Delivered') {
        return next(new errorHandler('Already Delivered this Order!', 404));
    }

    if (req.body.status === "Shipped") {
        for (const orderItem of order.orderItems) {
            await updateStock(orderItem.product, orderItem.quantity);
        }
    }

    order.orderStatus = req.body.status;

    if (req.body.status === 'Delivered') {
        order.deliveredAt = Date.now();
    }

    // Save the updated order and respond with success status and the updated order
    await order.save({
        validateBeforeSave: false
    });

    res.status(200).json({
        success: true,
        order
    });
});

// Update product stock quantity
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.product_stock -= quantity;
    await product.save({
        validateBeforeSave: false
    });
}

// Delete an order (Admin)
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new errorHandler('Order not Found with this ID', 404));
    }

    // Delete the specified order and respond with success status
    await order.deleteOne();

    res.status(200).json({
        success: true,
        message: 'Order Deleted!'
    });
});
