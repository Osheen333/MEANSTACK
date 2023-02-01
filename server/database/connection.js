const {MongoMemoryServer} = require("mongodb-memory-server");
const mongoose = require('mongoose');

exports.connect = async () => {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, { dbName: 'instituteDb'});
    console.log(`MongoDb successfully connected to ${mongoUri}`);
}