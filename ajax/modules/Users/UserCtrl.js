var User = require('./UserModel.js');

module.exports = function( app ){

	// User login without security
    app.post('/api/user/login', function( req, res ) {
    	User.findOne( req.body ).then( ( user ) => {
        	res.json(user);
        })
        .catch( (err ) => {
        	res.status(422).json(err);
        });
    });
}