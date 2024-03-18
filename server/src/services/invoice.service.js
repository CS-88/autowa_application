const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/invoice.model"); // Database Model


class FileService {

    constructor() {
        // Create an instance of the Data Access layer using the required model
        this.MongooseServiceInstance = new MongooseService(FileModel.Invoice);
    }


    //Creating Invoice Record
    async createInvoice(body) {
        try {
            //Creating Invoice Record
            let result = await this.MongooseServiceInstance.create(body)
            if(result.email === body.email){
                return { message : "success" }
            }

            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/invoice.service.js - createInvoice(body)" };
        }
    }


    

    //Find All Invoice Records of a specific user
    async getUserInvoices(body) {
        try {
            let result = await this.MongooseServiceInstance.find({ customer_email : body.customer_email})
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/invoice.service.js - getUserInvoices()" };
        }
    }


    //Find invoice Records of a specific service center
    async getServiceCenterInvoices(body) {
        try {
            let result = await this.MongooseServiceInstance.find({ service_center_email : body.service_center_email })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/invoice.service.js - getServiceCenterInvoices(body)" };
        }
    }



    
}

module.exports = FileService;