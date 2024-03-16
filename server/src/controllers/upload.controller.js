const config = require( '../config/config')

module.exports = { createUpload};


//upload function for assets
async function createUpload ( req, res ) {
  try {
    return res.send({Status: 200, path : req.file.path});
  } catch ( err ) {
    console.log( err ); 
    res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
  }
}