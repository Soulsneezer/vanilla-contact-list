const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contactSchema = new Schema ({
  "name": String,
  "phoneNumbers": [String],
  "mails": [String],
  "history": []
});

module.exports = mongoose.model('Contact', contactSchema);
