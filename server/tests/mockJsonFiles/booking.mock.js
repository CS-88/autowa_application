//MockObjects Used for the Service Center Testing

const mockObject = {
    id: "00-00000",
    date: "20/03/2024",
    start_time: "8.00 AM",
    end_time: "8.00 PM",
    status: "pending",
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

const findObject = {
    booking_name : "test user CAX-1234",
    service_center_email : "testservicecenter@gmail.com",
    customer_vehicle_number : "CAX-1234",
}


const updateObject = {
    id: "00-00000",
    date: "20/03/2024",
    start_time: "8.00 AM",
    end_time: "8.00 PM",
    status: "accepted",
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

module.exports = { mockObject , findObject , updateObject }