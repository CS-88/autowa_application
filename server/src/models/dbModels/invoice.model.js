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
            service: {
                car_wash : Boolean,
                wash_and_vacuum : Boolean,
                wash_and_interior_clean_up : Boolean,
                full_service : Boolean
            }
        },
        { 
            timestamps: true 
        }
    );

const Invoice = mongoose.model("invoice", InvoiceSchema);

module.exports.Invoice = Invoice;   