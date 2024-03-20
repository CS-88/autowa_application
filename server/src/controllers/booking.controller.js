const file = require( "../services/booking.service" );
const FileService = new file();

module.exports = { createBooking , getBooking , getBookingByStatus, getBookingById , getBookingByBookingName , getBookingByNumberPlate, setBookingStatus, deleteBooking };

    //Create new booking
    async function createBooking ( req, res ) {
        try {
            const result = await FileService.createBooking( req.body);
            return res.send( result );
        } catch ( err ) { 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find All Bookings for particular service center
    async function getBooking ( req, res ) {
        try {
            const result = await FileService.getBooking( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find All Bookings for particular service center with status
    async function getBookingByStatus ( req, res ) {
        try {
            const result = await FileService.getBookingByStatus( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


     //Find All Bookings for particular service center with id
     async function getBookingById ( req, res ) {
        try {
            const result = await FileService.getBookingById( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


    //Find All Bookings for particular service center with booking name
    async function getBookingByBookingName ( req, res ) {
        try {
            const result = await FileService.getBookingByBookingName( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }


     //Find All Bookings for particular service center with number plate
     async function getBookingByNumberPlate ( req, res ) {
        try {
            const result = await FileService.getBookingByNumberPlate( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

     //Set booking status
     async function setBookingStatus ( req, res ) {
        try {
            const result = await FileService.setBookingStatus( req.body);
            return res.send( result );
        } catch ( err ) {
            console.log( err ); 
            res.status( 500 ).send( { Status: 500 , Success: false, Error : `${err.name} : ${err.message}`  } );
        }
    }

    //delete booking with id
    async function deleteBooking(req, res) {
        try {
            const result = await FileService.deleteBooking(req.body);
            return res.send(result);
        } catch (err) {
            console.log(err);
            res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
        }
    }