const mongoose = require("mongoose");


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
            rating: String,
            url : String,
            review_total : String,
            review_count : String,
            booking_date : String,
            booking_count : String,
            password : String,
            car_wash: {
                status: Boolean,
                fee: String
            },
            wash_and_vacuum: {
                status: Boolean,
                fee: String
            },
            wash_and_interior_clean_up: {
                status: Boolean,
                fee: String
            },
            full_service: {
                status: Boolean,
                fee: String
            }
        },
        { 
        timestamps: true 
        }
    );

const ServiceCenter = mongoose.model("serviceCenter", ServiceCenterSchema);

module.exports.ServiceCenter = ServiceCenter;