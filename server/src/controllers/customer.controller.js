const file = require( "../services/customer.service" );
const FileService = new file();

module.exports = { registerCustomer , findCustomer , updateCustomer, updateCustomerPassword , deleteCustomer , updateCustomerPicture };

    //Create new customer through registration
    async function registerCustomer ( req, res ) {
        try {
            const result = await FileService.registerCustomer( req.body);
            return res.send( result );
        } catch ( err ) { 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //Updating Customer Record
    async function updateCustomer ( req, res ) {
        try {
            const result = await FileService.updateCustomer( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //Delete Customer Record
    async function deleteCustomer ( req, res ) {
        try {
            const result = await FileService.deleteCustomer( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    
    //Find Customer by Email 
    async function findCustomer ( req, res ) {
        try {
            const result = await FileService.findCustomer( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }



    //Updating Customer Password
    async function updateCustomerPassword ( req, res ) {
        try {
            const result = await FileService.updateCustomerPassword( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Updating Customer Picture
    async function updateCustomerPicture ( req, res ) {
        try {
            const result = await FileService.updateCustomerPicture( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }