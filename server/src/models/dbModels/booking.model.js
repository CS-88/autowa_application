const mongoose = require("mongoose");

    const ServiceSchema = new mongoose.Schema(
        {
            service_name: String,
            service_price: String,
        }
    );


    const BookingSchema = new mongoose.Schema(
        {
            id: String,
            date: String,
            start_time: String,
            end_time:String,
            status: String,
            booking_name : String,
            decline_note : String,
            service_center_note : String,
            service_center_email: String,
            customer_name: String,
            customer_vehicle_number: String,
            customer_special_notes : String,
            review_number: String,
            review_message: String,
            services: [ServiceSchema]
        },
        { 
            timestamps: true 
        }
    );

const Booking = mongoose.model("booking", BookingSchema);

module.exports.Booking = Booking;   