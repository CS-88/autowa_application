const mongoose = require("mongoose");

    const ServiceRecordSchema = new mongoose.Schema(
        {
            name: String,
            email: String,
            service_center_email : String,
            address: String,
            mobile_no: String,
            registration_number: String,
            model_year: String,
            odometer: String,
            frame_no: String,
            tyres_and_wheels: {
                tyre_condition: String
            },
            brake_system: {
                visible_fluid_leaks: String,
                abs: String,
                parking_lever: String,
                front_break_pad: String,
                rear_break_pad_shoes: String
            },
            seat_belts: {
                front_rear_other: String
            },
            ignition_system: {
                ignition_systems: String,
                battery: String,
                starter: String,
                charging_light_guage: String,
            },
            suspension_system: {
                upper_arm: String,
                lower_arm: String,
                stabilizer_bar_links: String
            },
            fuel_system: {
                air_filter: String
            },
            cooling_system: {
                radiator_coolant: String,
                cap: String,
                hoses: String,
                ac_fan: String,
                radiator_fan: String,
                other: String
            },
            exhaust_system: {
                pipes_mufflers: String
            },
            electrical_accessories_lights : {
                horn: String,
                wipers_and_washers: String,
                radio: String,
                heater: String,
                air_conditioner: String,
                temp_guage: String,
                oil_light_guage: String,
                instruments_w_light: String,
                srs_functions_w_light: String,
                abs_functions_w_light: String,
                front_lights: String,
                rear_lights: String,
                power_shutters: String,
                electrical_mirrors: String
            },
            engine: {
                oil_level_condition: String,
                mounts_tensioners: String,
                outer_belts: String
            },
            steering_system: {
                oil_level_condition: String,
                tie_road_ends_l_r_side: String,
                rack_ends_l_r_side: String,
                rack_boots: String
            },
            transmission: {
                transmission_system_manual: String,
                transmission_system_auto: String,
                atf_level_condition: String,
                drive_shaft_boots: String
            },
            remarks: String
        },
        { 
        timestamps: true 
        }
    );

const ServiceRecord = mongoose.model("serviceRecords", ServiceRecordSchema);

module.exports.ServiceRecord = ServiceRecord;