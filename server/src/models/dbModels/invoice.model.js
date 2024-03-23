const mongoose = require("mongoose");

    const InvoiceSchema = new mongoose.Schema(
        {
            invoice_no: String,
            name: String,
            address: String,
            tel: String,
            date: String,
            registration_no: String,
            model_year: String,
            vehicle_number:String,
            service_center_email : String,
            customer_email : String,
            service_options : {
                checked_in : Boolean,
                tires_and_wheels : Boolean
            },
            car_wash : {
                status : Boolean,
                fee : String
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

const Invoice = mongoose.model("invoice", InvoiceSchema);

module.exports.Invoice = Invoice;   