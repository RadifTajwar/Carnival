const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:[true, "Please enter the product Name"],
        trim:true
        },
    product_type: {
        type: String,
        required: [true, "Please enter the product Type"]
    },
    // product_category: {
    //     type: String,
    //     required: [true, "Please enter the product Category"]
    // },
    product_weight: {
        type: String,
        required: [true, "Please enter the product Weight"]
    },
    product_usage:{
        type:String,
        required:[true, "Please enter the product Usage"]
    },
    // product_manufacturer:{
    //     type:String,
    //     required:[true, "Please enter the product Manufacturer"]
    // },
    product_price:{
        type:Number,
        required:[true, "Please enter the product Price"],
        maxLength:[8, "Price can not be this Much!"]
    },
    product_rating:{
        type:Number,
        default:0
    },
    product_images:[
        {
            public_id: {
                type:String,
                required: true
            },
            url: {
                type:String,
                required: true
            }
        }
    ],
    product_stock:{
        type:Number,
        required:[true,"Please enter product Stock!"],
        maxLength: [4,"Too Much to Store!"],
    },
    num_of_Reviews:{
        type:Number,
        default:0
    },
    product_reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    user:{
        type:mongoose.Schema.ObjectId,//keep user id whether admin or normal user
        ref:"User",
        required:true
    }
})

module.exports = mongoose.model('Product', productSchema);
