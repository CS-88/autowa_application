const mongoose = require("mongoose");


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
            customer_email: String,
            customer_vehicle_number: String,
            customer_special_notes : String,
            review_number: String,
            review_message: String,
            service : {
                car_wash : {
                status : Boolean,
                fee : String
                },
                wash_and_vacum: {
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
            }
        },
        { 
            timestamps: true 
        }
    );

const Booking = mongoose.model("booking", BookingSchema);

module.exports.Booking = Booking;   