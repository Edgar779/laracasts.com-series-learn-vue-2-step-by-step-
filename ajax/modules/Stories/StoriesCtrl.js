var Stories = require('./StoriesModel.js');

module.exports = function( app ){

    app.get('/api/stories', function( req, res ){
    	// Query database
		Stories.find({}, function( err, stories ) {
		  if (err) throw err;

		  res.json( stories );
		});
    });

    app.get('/api/stories/:id', function(req, res){
    	// TODO Read from mongodb
    	
    });    
}