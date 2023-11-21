const mongoose = require('mongoose');
const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    // Use the mongoose.connection.collections to get the collection
    const collection = mongoose.connection.collections[collectionName];

    if (collection) {
      await collection.drop();
    }
  } catch (err) {
    throw err;
  }
};
