const mongoose = require("mongoose");

    const ServiceRecordSchema = new mongoose.Schema(
        {
            customer_name: String,
            customer_email: String,
            service_center_email : String,
            mobile_no: String,
            vehicle_no: String,
            model_year: String,
            odometer: String,
            engine: {
                oilLevelConditon : Boolean,
                mount_tension : Boolean,
                steering_oil_level : Boolean,
                transmission_oil : Boolean
            },
            electrical_accessories: {
                horn: Boolean,
                wipers_and_washers: Boolean,
                radio: Boolean,
                heater: Boolean,
                air_conditioner: Boolean,
                temp_guage: Boolean,
                oil_light_guage: Boolean,
                instruments_w_light: Boolean,
                srs_functions_w_light: Boolean,
                abs_functions_w_light: Boolean,
                front_lights: Boolean,
                rear_lights: Boolean,
                power_shutters: Boolean,
                electrical_mirrors: Boolean
            },
            service_options : {
                checked_in : Boolean,
                tires_and_wheels : Boolean
            },
            cooling_and_fuel_system: {
                radiator_coolant: Boolean,
                ac_fan: Boolean,
                air_filter: Boolean,
            }
        },
        { 
        timestamps: true 
        }
    );

const ServiceRecord = mongoose.model("serviceRecords", ServiceRecordSchema);

module.exports.ServiceRecord = ServiceRecord;