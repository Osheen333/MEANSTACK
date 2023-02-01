const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        province: {
            type: String,
            required: [true, 'Province is required']
        },
        sector: {
            type: String,
            required: [true, 'Sector is required']
        },
        level: {
            type: String,
            required: [true, 'Level is required']
        }
    }
);

const Institute = mongoose.model('Institute', instituteSchema);

module.exports = Institute;