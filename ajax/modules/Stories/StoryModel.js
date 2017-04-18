const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var StorySchema = new Schema({  
  title: { 
  	type: String,
  	required: [true, 'Title required']
  },
  body:  { 
  	type: String,
  	required: [true, 'Body required']
  }
});

module.exports = mongoose.model('Story', StorySchema);

