const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/serviceCenter.model"); // Database Model
const aws = require('../middleware/aws-bucket');  
const fs = require('fs');
const bcrypt = require('bcryptjs');

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

            //Hashing the Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt)
            body.password = hashedPassword;

            //Creating the Service Center
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


    //Find Service Center by name
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



    //Find Service Center by email
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


    //Find Service Center by location
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


    //Find Service Center by rating
    async findServiceCentersByRating(body) {
        try {
            let ratingArray = [];
            let result = await this.MongooseServiceInstance.find()

            if(result.length != 0){
                for(let i=0; i<result.length;i++){
                    if(parseFloat(result[i].rating) >= parseFloat(body.rating)){
                        ratingArray.push(result[i])
                    }
                }
                return ratingArray
            }

            return result
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - findServiceCentersByRating(body)" };
        }
    }


    //Update Service Booking Count
    async updateBookingCount(body) {
        try {
                let findCenter = await this.MongooseServiceInstance.findOne({email : body.email})
                let result;

                if(findCenter.length != 0){
                    if(findCenter.booking_date != body.booking_date){
                        findCenter.booking_date = body.booking_date;
                        let count = 1 
                        findCenter.booking_count = count.toString();
        
                        result = await this.MongooseServiceInstance.updateOne( {email : body.email} , findCenter)

                        return result
                    }
                    else if(findCenter.booking_date === body.booking_date){
                        let count = parseInt(findCenter.booking_count) + 1 
                        findCenter.booking_count = count.toString();
        
                        result = await this.MongooseServiceInstance.updateOne( {email : body.email} , findCenter)

                        return result
                    }
                }

                return result
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - updateBookingCount(body)" };
        }
    }


    //Update Service Center Picture
    async updateServiceCenterPicture( body , email ) {
        try {
            let imageExist = await this.findServiceCenterByEmail({ email: email });

            await aws.deletefile(imageExist.url);
    
            let aws_url = await aws.uploadfile(body.path)
    
    
            fs.unlink(body.path, (err) => {
              if (err) {
                throw err;
              }
            });
    
            imageExist.url = aws_url.Location;
            
            let process = await this.MongooseServiceInstance.updateOne({ email: imageExist.email }, imageExist);

            if(process.modifiedCount == 1){
                return { url : imageExist.url};
            }

            return { message : "Image upload failed"}
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./src/services/serviceCenter.service.js - updateServiceCenterPicture(body)" };
        }
    }

}

module.exports = FileService;