const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isIncome: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    budgetLimit: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },

})

const CategoryModel = mongoose.model('Categories', categorySchema);
module.exports = CategoryModel