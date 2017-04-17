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
    app.post('/api/stories', ( req, res ) => {
    	
    	Story.create(req.body, ( err, numAffected ) => {
			
			if (err) throw err;

			Story.find({}, ( err, stories ) => {
			
			  if (err) throw err;

			  res.json( stories );
			
			});
		})
		
    });

    // Updates a story

    // Deletes a story
}