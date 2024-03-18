const mongoose = require("mongoose");

    const ServiceSchema = new mongoose.Schema(
        {
            service_name: String,
            service_price: String,
        }
    );


    const InvoiceSchema = new mongoose.Schema(
        {
            invoice_no: String,
            name: String,
            registration_no: String,
            vehicle_number:String,
            service_center_email : String,
            customer_email : String,
            service_options: [
                {
                    option : String,
                    fee : String            
                }
            ],
            address : String,
            date : String,
            model_year : String,
            services: [ServiceSchema]
        },
        { 
            timestamps: true 
        }
    );

const Invoice = mongoose.model("invoice", InvoiceSchema);

module.exports.Invoice = Invoice;   