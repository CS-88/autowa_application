const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/booking.model"); // Database Model


class FileService {

    constructor() {
        // Create an instance of the Data Access layer using the required model
        this.MongooseServiceInstance = new MongooseService(FileModel.Booking);
    }


    //Creating new booking
    async createBooking(body) {
        try {

            body.id = await this.getNewId();
            body.booking_name = body.customer_name + " " + body.customer_vehicle_number
            //Creating the Booking
            let result = await this.MongooseServiceInstance.create(body)
            if(result.id === body.id){
                return { message : "success" }
            }
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - createBooking(body)" };
        }
    }



    //checking the database and creating a unique id
    async getNewId() {
        try {
            const currentYear = new Date().getFullYear().toString().slice(-2);
            let randomDigits = Math.floor(Math.random() * 90000) + 10000;
            let id = currentYear + '-' + randomDigits.toString().slice(0, 6);

            let res = await this.MongooseServiceInstance.findOne({id:id})

            while(res != null){
                randomDigits = Math.floor(Math.random() * 90000) + 10000;
                id = currentYear + '-' + randomDigits.toString().slice(0, 6);
                res = await this.MongooseServiceInstance.findOne({id:id})
            }

            return id.toString();
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./Src/Service/booking.service.js - getNewId(body)" };
        }
    }


    //Find All bookings of a specific Service Centers
    async getBooking(body) {
        try {
            let result = await this.MongooseServiceInstance.find( { service_center_email : body.service_center_email })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - getBooking()" };
        }
    }


   //Find All bookings of a specific Service Centers with status
    async getBookingByStatus(body) {
        try {
            let result = await this.MongooseServiceInstance.find( { service_center_email : body.service_center_email, status : body.status })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - getBookingByStatus()" };
        }
    }


    //Find All bookings of a specific Service Centers with booking name
    async getBookingByBookingName(body) {
        try {
            let result = await this.MongooseServiceInstance.find( { service_center_email : body.service_center_email, booking_name : body.booking_name })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - getBookingByBookingName()" };
        }
    }


    //Find All bookings of a specific Service Centers with booking name
    async getBookingByNumberPlate(body) {
        try {
            let result = await this.MongooseServiceInstance.find( { service_center_email : body.service_center_email, customer_vehicle_number : body.customer_vehicle_number })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - getBookingByBookingName()" };
        }
    }


    //Set booking status with ID
    async setBookingStatus(body) {
        try {
            let bookingExist = await this.MongooseServiceInstance.find( { id : body.id })
            bookingExist.status = body.status;
            let result = await this.MongooseServiceInstance.updateOne({ id : body.id, bookingExist});
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/booking.service.js - getBookingByBookingName()" };
        }
    }
    
}

module.exports = FileService;