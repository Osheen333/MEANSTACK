const factory = require('./handleFactory');
const Institute = require('./../model/instituteModel');

exports.getAllInstitutes = factory.getAll(Institute);
exports.getInstitute = factory.getOne(Institute);
exports.createInstitute = factory.createOne(Institute);
exports.updateInstitute = factory.updateOne(Institute);
exports.deleteInstitute = factory.deleteOne(Institute);
