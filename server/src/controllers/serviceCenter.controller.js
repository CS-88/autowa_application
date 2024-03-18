const file = require( "../services/serviceCenter.service" );
const FileService = new file();

module.exports = { registerServiceCenter , findAllServiceCenters , findServiceCenter , updateServiceCenter , deleteServiceCenter , updateServiceCenterPicture , findServiceCentersByLocation , findServiceCenterByEmail };

    //Create new Service Center through registration
    async function registerServiceCenter ( req, res ) {
        try {
            const result = await FileService.registerServiceCenter( req.body);
            return res.send( result );
        } catch ( err ) { 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //Updating Service Center Record
    async function updateServiceCenter ( req, res ) {
        try {
            const result = await FileService.updateServiceCenter( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Delete Service Center Record
    async function deleteServiceCenter ( req, res ) {
        try {
            const result = await FileService.deleteServiceCenter( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //Find All Service Centers
    async function findAllServiceCenters ( req, res ) {
        try {
            const result = await FileService.findAllServiceCenters( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find Service Center by name 
    async function findServiceCenter ( req, res ) {
        try {
            const result = await FileService.findServiceCenter( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find Service Center by email 
    async function findServiceCenterByEmail ( req, res ) {
        try {
            const result = await FileService.findServiceCenterByEmail( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find Service Center by location 
    async function findServiceCentersByLocation ( req, res ) {
        try {
            const result = await FileService.findServiceCentersByLocation( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Updating Service Center Picture
    async function updateServiceCenterPicture ( req, res ) {
        try {
            const result = await FileService.updateServiceCenterPicture( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }