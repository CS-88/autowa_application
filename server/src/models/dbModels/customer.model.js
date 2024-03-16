const mongoose = require("mongoose");

  const CustomerSchema = new mongoose.Schema(
    {
      name: String,
      email: String,
      mobile_no: String,
      vehicle_type:String,
      vehicle_model:String,
      vehicle_number:String,
      mileage:String,
      url: String,
      password: String
    },
    { 
      timestamps: true 
    }
  );

const Customer = mongoose.model("customer", CustomerSchema);

module.exports.Customer = Customer;