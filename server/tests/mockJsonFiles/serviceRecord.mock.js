//MockObjects Used for the Service Center Testing

const mockObject = {
    customer_name: "test user",
    customer_email: "testuser@gmail.com",
    date: "test date",
    service_center_email: "testservicecenter@gmail.com",
    mobile_no: "0783323161",
    vehicle_no: "CAX-1234",
    model_year: "Civic 2015",
    odometer: "meter",
    engine: {
        oilLevelConditon: true,
        mount_tension: true,
        steering_oil_level: true,
        transmission_oil: true
    },
    electrical_accessories: {
        horn: true,
        wipers_and_washers: true,
        radio: true,
        heater: true,
        air_conditioner: true,
        temp_guage: true,
        oil_light_guage: true,
        instruments_w_light: true,
        srs_functions_w_light: true,
        abs_functions_w_light: true,
        front_lights: true,
        rear_lights: true,
        power_shutters: true,
        electrical_mirrors: true
    },
    service_options: {
        checked_in: true,
        tires_and_wheels: true
    },
    cooling_and_fuel_system: {
        radiator_coolant: true,
        ac_fan: true,
        air_filter: true
    }
}

const findObject = {
    service_center_email: "testservicecenter@gmail.com",
    email: "testuser@gmail.com",
}


const updateObject = {
    customer_name: "test user",
    customer_email: "testuser@gmail.com",
    date: "test date",
    service_center_email: "testservicecenter@gmail.com",
    mobile_no: "0783323161",
    vehicle_no: "CAX-1234",
    model_year: "Civic 2015",
    odometer: "meter",
    engine: {
        oilLevelConditon: true,
        mount_tension: true,
        steering_oil_level: true,
        transmission_oil: true
    },
    electrical_accessories: {
        horn: true,
        wipers_and_washers: true,
        radio: true,
        heater: true,
        air_conditioner: true,
        temp_guage: true,
        oil_light_guage: true,
        instruments_w_light: true,
        srs_functions_w_light: true,
        abs_functions_w_light: true,
        front_lights: true,
        rear_lights: true,
        power_shutters: true,
        electrical_mirrors: true
    },
    service_options: {
        checked_in: true,
        tires_and_wheels: true
    },
    cooling_and_fuel_system: {
        radiator_coolant: true,
        ac_fan: true,
        air_filter: true
    }
}

module.exports = { mockObject, findObject, updateObject }