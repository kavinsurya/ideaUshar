const mongoose = require('mongoose');
const db = require('../connection/dbConnection');

const defaultSchema = require('../connection/dbDefaultPlugin');

const itemsSchema = new mongoose.Schema({
  guid: {
    type: String,
  },
  title: {
    type: String,
  },
  url: {
    type: String,
  },
  content_html: {
    type: String,
  },
  date_published: {
    type: Date,
  },
  summary: {
    type: String,
  },

  author: {
    name: { type: String },
  },
});

itemsSchema.plugin(defaultSchema);

module.exports = db.model('items', itemsSchema);
