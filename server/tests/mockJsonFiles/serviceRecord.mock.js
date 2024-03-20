//MockObjects Used for the Service Center Testing

const mockObject = {
    customer_name: "test user",
    customer_email: "testuser@gmail.com",
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
    id: "00-00000",
    date: "20/03/2024",
    start_time: "8.00 AM",
    end_time: "8.00 PM",
    status: "declined",
    booking_name: "String",
    decline_note: "note",
    service_center_note: "note",
    service_center_email: "testservicecenter@gmail.com",
    customer_name: "test user",
    customer_email: "testuser@gmail.com",
    customer_vehicle_number: "CAX-1234",
    customer_special_notes: "note",
    review_number: "",
    review_message: "",
    car_wash: {
        status: true,
        fee: "4000"
    },
    wash_and_vacuum: {
        status: true,
        fee: "7000"
    },
    wash_and_interior_clean_up: {
        status: true,
        fee: "8000"
    },
    full_service: {
        status: true,
        fee: "12000"
    }
}

module.exports = { mockObject, findObject, updateObject }