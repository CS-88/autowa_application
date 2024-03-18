const mongoose = require("mongoose");

    const ServiceSchema = new mongoose.Schema(
        {
            service_name: String,
            price: String,
        }
    );


    const ServiceCenterSchema = new mongoose.Schema(
        {
        name: String,
        email: String,
        mobile_no: String,
        description:String,
        about_us:String,
        location:String,
        open_days:String,
        open_hours: String,
        ratings: String,
        url : String,
        review_total : String,
        review_count : String,
        services: [ServiceSchema]
        },
        { 
        timestamps: true 
        }
    );

const ServiceCenter = mongoose.model("serviceCenter", ServiceCenterSchema);

module.exports.ServiceCenter = ServiceCenter;