const file = require( "../services/invoice.service" );
const FileService = new file();

module.exports = { createInvoice , getUserInvoices , getServiceCenterInvoices};

    //Create new Invoice
    async function createInvoice ( req, res ) {
        try {
            const result = await FileService.createInvoice( req.body);
            return res.send( result );
        } catch ( err ) { 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }



    //Find All Invoice records of the user
    async function getUserInvoices ( req, res ) {
        try {
            const result = await FileService.getUserInvoices( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    

    //Find invoice records of specific service center 
    async function getServiceCenterInvoices ( req, res ) {
        try {
            const result = await FileService.getServiceCenterInvoices( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }