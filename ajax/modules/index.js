var fs = require('fs');

// Main DB file MongoDB config conection

var mongoose = require('mongoose');  

mongoose.connect('mongodb://localhost/vue'); 

module.exports = function( app ) {

	// Scan root folders ( /modules )
    fs.readdirSync( __dirname ).forEach(function( folder ) {
    	
    	var folderPath = __dirname.concat('/', folder, '/');

       	// Skip if it's not a folder
        if (folder == "index.js") return;

    	// Scan subfolders ( /modules/*/)
    	fs.readdirSync( folderPath ).forEach(function( file ) {
	        
	        // Skip current file
	        if (file == "index.js") return;

	        // Get controller name
	        var name = file.substr(0, file.indexOf('.'));

	        // Include the file if it's a controller
	        if ( name.indexOf('Ctrl') > -1 ) {
	        	require(folderPath + name)(app);
	        }
	        // Include mongoose models
	        else if ( name.indexOf('Model') > -1) {
	        	require(folderPath + name)();
	        }
	        else {
	        	return;
	        }
	    });

    });
}