const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StorySchema = new Schema({  
  title:    { type: String },
  id:     { type: Number },
  body:  { type: String }
});

module.exports = mongoose.model('Story', StorySchema);

