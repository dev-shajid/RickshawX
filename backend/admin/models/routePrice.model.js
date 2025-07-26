const mongoose = require('mongoose');

const routePriceSchema = new mongoose.Schema({
    fromLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    toLocation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    distance: {
        type: Number, // in kilometers
        required: true,
        min: 0
    },
    estimatedTime: {
        type: Number, // in minutes
        required: true,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Ensure no duplicate routes and prevent same location routes
routePriceSchema.index({ fromLocation: 1, toLocation: 1 }, { unique: true });

// Validation to prevent same location pickup and drop
routePriceSchema.pre('save', function(next) {
    if (this.fromLocation.toString() === this.toLocation.toString()) {
        next(new Error('From and To locations cannot be the same'));
    } else {
        next();
    }
});

module.exports = mongoose.model('RoutePrice', routePriceSchema);