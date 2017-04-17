const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StorySchema = new Schema({  
  title:    { type: String },
  body:  { type: String }
});

module.exports = mongoose.model('Story', StorySchema);

