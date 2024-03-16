const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/serviceCenter.model"); // Database Model
const aws = require('../middleware/aws-bucket');  
const fs = require('fs');


class FileService {

    constructor() {
        // Create an instance of the Data Access layer using the required model
        this.MongooseServiceInstance = new MongooseService(FileModel.ServiceCenter);
    }


    //Registering Service Center in to the database
    async registerServiceCenter(body) {
        try {
            //Check if email already exists
            let emailExist = await this.findEmailExist(body.email);
            if (emailExist) return { Status: "400", Email: emailExist.email, Error: "Email Already Exists!" }

            //Creating the User
            let result = await this.MongooseServiceInstance.create(body)
            if(result.email === body.email){
                return { message : "success" }
            }

            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - registerServiceCenter(body)" };
        }
    }


    //Updating Service Center
    async updateServiceCenter(body) {
        try {
            //Updating document and returning result
            let result = await this.MongooseServiceInstance.updateOne({ email: body.email }, body);
            console.log(result)
            if(result.modifiedCount === 1){
                return { message : "success" }
            }
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - updateServiceCenter(body)" };
        }
    }

    //Deleting Service Center
    async deleteServiceCenter(body) {
        try {
            let result = await this.MongooseServiceInstance.deleteOne({ email: body.email });
            if(result.deletedCount === 1){
                return { message : "success" }
            }
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/service/serviceCenter.service.js - deleteServiceCenter(body)" };
        }
    }

    //Function to find if email exists already
    async findEmailExist(email) {
        try {
            return await this.MongooseServiceInstance.findOne({ email: email });
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findEmailExist(email)" };
        }
    }

    //Find All Service Centers
    async findAllServiceCenters() {
        try {
            let result = await this.MongooseServiceInstance.find()
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findAllServiceCenters()" };
        }
    }


    //Find Service Center
    async findServiceCenter(body) {
        try {
            let result = await this.MongooseServiceInstance.findOne({ name : body.name })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findServiceCenter(body)" };
        }
    }



    //Find Service Center
    async findServiceCenterByEmail(body) {
        try {
            let result = await this.MongooseServiceInstance.findOne({ email : body.email })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findServiceCenterByEmail(body)" };
        }
    }


    //Find Service Center
    async findServiceCentersByLocation(body) {
        try {
            let result = await this.MongooseServiceInstance.find({ location : body.location })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findServiceCentersByLocation(body)" };
        }
    }

    //Update Service Center Picture
    async updateServiceCenterPicture( body ) {
        try {
            //console.log(body)
            let imageExist = await this.findServiceCenterByEmail({ email: body.email });
            console.log(imageExist)
            console.log(body.url)
            await aws.deletefile(imageExist.url);
    
            let aws_url = await aws.uploadfile(body.url)
    
    
            fs.unlink(body.url, (err) => {
              if (err) {
                throw err;
              }
    
              console.log("Deleted File successfully.");
            });
    
    
            imageExist.url = aws_url.Location;
            
            let process =  await this.MongooseServiceInstance.updateOne({ email: body.email }, imageExist);

            return { url : imageExist.url};
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - updateServiceCenterPicture(body)" };
        }
    }

}

module.exports = FileService;