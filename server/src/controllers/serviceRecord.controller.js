const file = require( "../services/serviceRecord.service" );
const FileService = new file();

module.exports = { createServiceRecord , getServiceCenterRecords , getUserRecords};

    //Create new Service Record
    async function createServiceRecord ( req, res ) {
        try {
            const result = await FileService.createServiceRecord( req.body);
            return res.send( result );
        } catch ( err ) { 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //Find All Service records of the service center
    async function getServiceCenterRecords ( req, res ) {
        try {
            const result = await FileService.getServiceCenterRecords( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    

    //Find Service records of user 
    async function getUserRecords ( req, res ) {
        try {
            const result = await FileService.getUserRecords( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }