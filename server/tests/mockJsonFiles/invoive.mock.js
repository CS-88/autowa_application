//MockObjects Used for the Service Center Testing

const mockObject = {
    invoice_no: "testno",
    name: "test user",
    address: "test address",
    tel: "0783323271",
    date: "21/03/2024",
    registration_no: "123456789",
    model_year: "Civic 2015-",
    vehicle_number: "CAX-1234",
    service_center_email: "testservicecenter@gmail.com",
    customer_email: "testuser@gmail.com",
    service_options: {
        checked_in: true,
        tires_and_wheels: true
    },
    service: {
        car_wash: true,
        wash_and_vacuum: true,
        wash_and_interior_clean_up: true,
        full_service: true
    }
}

const findObject = {
    service_center_email: "testservicecenter@gmail.com",
    customer_email: "testuser@gmail.com",
}

module.exports = { mockObject, findObject }