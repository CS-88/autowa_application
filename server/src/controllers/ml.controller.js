// const file = require( "../services/ml.service" );
// const FileService = new file();

// module.exports = { postModel };

//     //Create new customer through registration
//     async function postModel ( req, res ) {
//         try {
//             const result = await FileService.postModel( req.body);
//             return res.send( result );
//         } catch ( err ) { 
//             res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
//         }
//     }