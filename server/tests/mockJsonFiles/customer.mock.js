//MockObjects Used for the Customer Testing

const mockObject = {
    name: "testuser",
    email: "testuser@gmail.com",
    mobile_no: "0783323261",
    vehicle_type:"Car",
    vehicle_model: "Civic",
    vehicle_number:"CAL-7843",
    mileage:"91,000",
    url: "none",
    password: "testuser123"
}


const mockFalseObject = {
    name: "testuser",
    email: "testuser",
    mobile_no: "0783323261",
    vehicle_type:"Car",
    vehicle_model: "Civic",
    vehicle_number:"CAL-7843",
    mileage:"91,000",
    url: "none",
    password: "testuser123"
}

const mockLoginObject = {
    email : "testuser@gmail.com",
    password : "testuser123"
}


const mockFalseLoginObject = {
    email : "testuser@gmail.com",
    password : "testuser123333"
}


const findObject = {
    name: "testuser",
    email: "testuser@gmail.com",
    mobile_no: "0783323261",
    vehicle_type:"Car",
    vehicle_model: "Civic",
    vehicle_number:"CAL-7843",
    mileage:"91,000",
    url: "none"
}


const updateObject = {
    name: "testuser",
    email: "testuser@gmail.com",
    mobile_no: "0783323261",
    vehicle_type:"Car",
    vehicle_model: "Civic",
    vehicle_number:"CAL-7843",
    mileage:"95,000",
    url: "none"
}

const updateFalseObject = {
    name: "testuser",
    email: "testuser@gmail.com",
    mobile_no: "078332",
    vehicle_type:"Car",
    vehicle_model: "Civic",
    vehicle_number:"CAL-7843",
    mileage:"95,000",
    url: "none"
}

module.exports = { mockLoginObject , mockFalseLoginObject, mockObject , mockFalseObject , findObject , updateObject , updateFalseObject}