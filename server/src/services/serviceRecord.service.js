const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/serviceRecord.model"); // Database Model


class FileService {

    constructor() {
        // Create an instance of the Data Access layer using the required model
        this.MongooseServiceInstance = new MongooseService(FileModel.ServiceRecord);
    }


    //Creating Service Record
    async createServiceRecord(body) {
        try {
            //Creating Service Record
            let result = await this.MongooseServiceInstance.create(body)
            if(result.email === body.email){
                return { message : "success" }
            }

            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceRecord.service.js - createServiceRecord(body)" };
        }
    }


    

    //Find All Service Records of a specific center
    async getServiceCenterRecords(body) {
        try {
            let result = await this.MongooseServiceInstance.find({ service_center_email : body.service_center_email})
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceRecord.service.js - getServiceCenterRecords()" };
        }
    }


    //Find Service Records of a user
    async getUserRecords(body) {
        try {
            let result = await this.MongooseServiceInstance.find({ customer_email: body.customer_email })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceRecord.service.js - getUserRecords(body)" };
        }
    }



    //Find Service Records of a user
    async deleteRecord(body) {
        try {
            let result = await this.MongooseServiceInstance.deleteOne({ service_center_email: body.service_center_email })
            if (result.deletedCount === 1) {
                return { message: "success" }
            }
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceRecord.service.js - deleteRecord(body)" };
        }
    }



    
}

module.exports = FileService;