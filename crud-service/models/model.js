const mongoose = require('mongoose');

// Configuring the database
const CalcSchema = mongoose.Schema({
    num1: Number,
    num2: Number,
    result: Number,
    operationName: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Calc', CalcSchema);