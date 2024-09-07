const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description : {
    type : String,
    required : true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  }
});

const IncomeModel = mongoose.model('Income', incomeSchema);
module.exports = IncomeModel
