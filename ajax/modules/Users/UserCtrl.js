var UserModel = require('./UserModel.js');

module.exports = function( app ){

    app.get('/api/users', function(req, res){
        res.json( ['Ori','Ale'] );
    });

    //other routes..
}