const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number
    },
    price: {
        type: Number
    },
});

const WarehouseSchema = new Schema({
    hubName: {
        type: String,
        required: true,
    },
    products: [ProductSchema], 
    address: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Index the location field for geospatial queries
WarehouseSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Warehouse", WarehouseSchema);
