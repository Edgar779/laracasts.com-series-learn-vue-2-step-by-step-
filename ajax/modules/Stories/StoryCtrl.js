var Story = require('./StoryModel.js');

module.exports = ( app ) => {

	// Get stories list
    app.get('/api/stories', ( req, res ) => {

    	Story.find({}, ( err, stories ) => {
		
		  if (err) throw err;

		  res.json( stories );
		
		});
    });

    // Adds a new story
    app.post('/api/stories', ( req, res, next ) => {
		
		Story.create(req.body, ( err, numAffected ) => {
		  	if (err) {
		  		res.status( 422 ).send( err.errors );
		  	}
		  	else {
				Story.find({}, ( err, stories ) => res.json( stories ));
			}
		}).catch( ( err ) => {
			return next( err );
		});
    });

    // Updates a story

    // Deletes a story
}