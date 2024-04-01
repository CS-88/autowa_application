//MockObjects Used for the Service Center Testing

const mockObject = {
    name : "test serice center",
    email : "testservicecenter@gmail.com",
    mobile_no : "0112821176",
    description : "description of test service center",
    about_us : "about us of test service center",
    location : "testLocation",
    open_days : "Monday - Friday",
    open_hours : "8.00 Am - 9.00 Pm",
    rating : "5",
    url : "none",
    review_total : "15",
    review_count : "3",
    booking_date : "3/19/2024",
    booking_count : "0",
    password : "testcenter123",
    car_wash: {
        status: true,
        fee: "4000"
    },
    wash_and_vacum: {
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

const mockLoginObject = {
    email : "testservicecenter@gmail.com",
    password : "testcenter123"
}


const mockFalseLoginObject = {
    email : "testservicecenter@gmail.com",
    password : "testcenter123333"
}


const findObject = {
    name : "test serice center",
    email : "testservicecenter@gmail.com",
    location : "testLocation",
    rating : "5"
}


const updateObject = {
    name : "test serice center",
    email : "testservicecenter@gmail.com",
    mobile_no : "0112821176",
    description : "description of test service center",
    about_us : "about us of test service center",
    location : "testLocation",
    open_days : "Monday - Friday",
    open_hours : "8.00 Am - 8.00 Pm",
    rating : "5",
    url : "none",
    review_total : "15",
    review_count : "3",
    booking_date : "3/19/2024",
    booking_count : "0",
    password : "testcenter123",
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

module.exports = { mockLoginObject , mockFalseLoginObject, mockObject , findObject , updateObject }