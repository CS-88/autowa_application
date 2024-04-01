const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModel = require("../models/dbModels/customer.model"); // Database Model
const { registerCustomerValidation } = require("../validation/customer.validation");
const aws = require('../middleware/aws-bucket');  
const fs = require('fs');
const bcrypt = require('bcryptjs');


class FileService {

    constructor() {
        // Create an instance of the Data Access layer using the required model
        this.MongooseServiceInstance = new MongooseService(FileModel.Customer);
    }


    //Function to find if email exists already
    async findEmailExist(email) {
        try {
            return await this.MongooseServiceInstance.findOne({ email: email });
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - findEmailExist(email)" };
        }
    }


    //Registering user in to the database along with Validating the entered data.
    async registerCustomer(body) {
        try {
            //Validating with joi schema by calling validateRegistration function at the end of the page
            if (body != null) {
                let { error } = await registerCustomerValidation(body);
                if (error) return { Status: "400", Error: error.details[0].message } 
            }

            //Check if email already exists
            let emailExist = await this.findEmailExist(body.email);
            if (emailExist) return { Status: "400", Email: emailExist.email, Error: "Email Already Exists!" }

            //Hashing the Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.password, salt)
            body.password = hashedPassword;

            //Creating the User
            let result = await this.MongooseServiceInstance.create(body)
            if(result.email === body.email){
                return { message : "success" }
            }

            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - registerCustomer(body)" };
        }
    }



    //Deleting Customer
    async deleteCustomer(body) {
        try {

            let recordExist = await this.MongooseServiceInstance.findOne({ email: body.email });

            await aws.deletefile(recordExist.url);
            

            let result = await this.MongooseServiceInstance.deleteOne({ email: body.email });
            if(result.deletedCount === 1){
                return { message : "success" }
            }
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/service/customer.service.js - deleteCustomer(body)" };
        }
    }

    

    //Find Customer
    async findCustomer(body) {
        try {
            let result = await this.MongooseServiceInstance.findOne({ email: body.email })
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - findCustomer(body)" };
        }
    }



    //Update Customer Password
    async updateCustomerPassword( body ) {
        try {
            if(body.new_password != body.retype_new_password){return {Status : 400 , Error: "Passwords do not Match"}}

            let user = await this.MongooseServiceInstance.findOne({email : body.email})
            if(!user){ return null }

            const validPassword = await bcrypt.compare(body.old_password, user.password)
            if (!validPassword) return { Status: 400, Error: "Please Enter the Valid Old Password" }

            //Hashing the Password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(body.new_password, salt)

            //Updating document and returning result
            let result = await this.MongooseServiceInstance.updateOne({email : body.email},{password : hashedPassword});
            if(result.modifiedCount === 1){
                return { message : "success" }
            }
            return result;
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - updateCustomerPassword(body)" };
        }
    }


    //Update Customer Picture
    async updateCustomerPicture( body , email ) {
        try {
            let imageExist = await this.findCustomer({ email: email });

            await aws.deletefile(imageExist.url);

            let aws_url = await aws.uploadfile(body.path)
    
    
            fs.unlink(body.path, (err) => {
              if (err) {
                throw err;
              }
            });
    
    
            imageExist.url = aws_url.Location;
            
            let process =  await this.MongooseServiceInstance.updateOne({ email: imageExist.email }, imageExist);

            if(process.modifiedCount == 1){
                return { url : imageExist.url};
            }
            return { message : "Image upload failed"}
        } 
        catch ( err ) {
            console.log( err)
            return { Status: 500, Error : `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - updateCustomerPicture(body)" };
        }
    }


     //Updating Customer
     async updateCustomer(body) {
        try {
            //Validating with joi schema
            if (body != null) {
                let { error } = await registerCustomerValidation(body);
                if (error) return { Status: "400", Error: error.details[0].message }
            }

            //Updating document and returning result
            let result = await this.MongooseServiceInstance.updateOne({ email: body.email }, body);
            if(result.modifiedCount === 1){
                return { message : "success" }
            }
            return result;
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/services/customer.service.js - updateCustomer(body)" };
        }
    }

}

module.exports = FileService;