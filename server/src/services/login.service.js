const MongooseService = require('../utils/functions'); // Data Access Layer
const FileModelServiceCenter = require("../models/dbModels/serviceCenter.model"); // Database Model
const FileModelCustomer = require("../models/dbModels/customer.model"); // Database Model
const { loginValidation} = require("../validation/login.validation");
const bcrypt = require('bcryptjs');


class LoginService {

    constructor() { }


   //Web login
    async loginAndAuthenticateWeb(body) {
        try {

            //Validate user login with Joi Schema
            let { error } = await loginValidation(body)
            if (error) return { Status: "400", Error: error.details[0].message }

            //Check if email exists
            model = FileModelServiceCenter.ServiceCenter;
            this.MongooseServiceInstance = new MongooseService(model);

            let User = await this.MongooseServiceInstance.findOne({ email: body.email });
            if (!User) return { Status: "400", Error: "Email or Password is Incorrect" }

            //Checking Password
            const validPassword = await bcrypt.compare(body.password, User.password)
            if (!validPassword) return { Status: "400", Error: "Email or Password is Incorrect" }

            if( validPassword === true ) {
                return User
            }
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/service/login.service.js - loginAndAuthenticate(body)" };
        }
    }




    //Mobile login
     async loginAndAuthenticateMobile(body) {
        try {
            //Validate user login with Joi Schema
            let { error } = await loginValidation(body)
            if (error) return { Status: "400", Error: error.details[0].message }

            //Check if email exists
            model = FileModelCustomer.Customer;
            this.MongooseServiceInstance = new MongooseService(model);

            let User = await this.MongooseServiceInstance.findOne({ email: body.email });
            if (!User) return { Status: "400", Error: "Email or Password is Incorrect" }

            //Checking Password
            const validPassword = await bcrypt.compare(body.password, User.password)
            if (!validPassword) return { Status: "400", Error: "Email or Password is Incorrect" }

            if( validPassword === true ) {
                return User
            }
        }
        catch (err) {
            console.log(err)
            return { Status: 500, Error: `${err.name} : ${err.message} `, Location: "./src/service/login.service.js - loginAndAuthenticate(body)" };
        }
    }
}

module.exports = LoginService;