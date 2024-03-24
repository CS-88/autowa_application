import React, { useState, useEffect } from 'react';
// State for storing customer data fetched from the server
const RecordModal = ({ onClose, customerName, customerVno, serviceEmail, customerEmail }) => {
  const [customerData, setCustomerData] = useState({
    mobile_no: '',
    vehicle_model: '',
    mileage: ''
  });
// Fetch customer data from the server when component mounts or when customerEmail changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://autowa-backend.onrender.com/api/customer/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: customerEmail }),
        });// Cleanup function
  
        if (response.ok) {
          const data = await response.json();
          setCustomerData(data);
          console.log('Customer data fetched successfully:', data);
        } else {
          console.error('Failed to fetch customer data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }// State for service options
    };
  
    fetchData();
  
    return () => {
    };
  }, [customerEmail]); 

  
  const [serviceOption, setServiceOption] = useState('Checked-in');
  const [engine, setEngine] = useState({
    oilLevelConditon: false,
    mount_tension: false,
    steering_oil_level: false,
    transmission_oil: false
  });// State for electrical accessories status
  const [electricalAccessories, setElectricalAccessories] = useState({
    horn: false,
    wipers_and_washers: false,
    radio: false,
    heater: false,
    air_conditioner: false,
    temp_guage: false,
    oil_light_guage: false,
    instruments_w_light: false,
    srs_functions_w_light: false,
    abs_functions_w_light: false,
    front_lights: false,
    rear_lights: false,
    power_shutters: false,
    electrical_mirrors: false
  });// State for cooling and fuel system status
  const [coolingAndFuelSystem, setCoolingAndFuelSystem] = useState({
    radiator_coolant: false,
    ac_fan: false,
    air_filter: false
  });// State for showing popup

  const [showPopup, setShowPopup] = useState(false); 

  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '100%', // Adjust the width as needed
    maxWidth: '1000px', // Set a maximum width if desired
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr', // Four columns layout
    gap: '20px', // Gap between form elements
  };

  const handleServiceOptionChange = (option) => {
    setServiceOption(option);
  };

  const handleSendRecord = async () => {
    // Construct data object to send to backend
    const data = {
      customer_name: customerName,
      customer_email: customerEmail,
      service_center_email: serviceEmail, 
      mobile_no: customerData.mobileNo, 
      vehicle_no: customerVno,
      model_year: customerData.modelYear, 
      odometer: customerData.odometer, 
      engine: engine,
      electrical_accessories: electricalAccessories,
      service_options: {
        checked_in: serviceOption === 'Checked-in',
        tires_and_wheels: serviceOption === 'Tires and Wheels'
      },
      cooling_and_fuel_system: coolingAndFuelSystem
    };

    try {
      const response = await fetch('https://autowa-backend.onrender.com/api/serviceRecord/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setShowPopup(true); // Show the popup
      } else {
        console.error('Failed to send service record:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending service record:', error);
    }
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2 style={{ marginBottom: '20px' }}>INSPECTION REPORT</h2>
        <form style={formStyle}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={customerName} readOnly />
          </div>
          <div className="form-group">
            <label>Customer Email:</label>
            <input type="text" value={customerEmail} readOnly />
          </div>
          <div className="form-group">
            <label>Service Center Email:</label>
            <input type="text" value={serviceEmail} readOnly />
          </div>
          <div className="form-group">
            <label>Vehicle No:</label>
            <input type="text" value={customerVno} readOnly />
          </div>
          <div className="form-group">
            <label> Vehicle Model:</label>
            <input type="text" value={customerData.vehicle_model || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Mobile No:</label>
            <input type="text" value={customerData.mobile_no || ''} readOnly />
          </div>
          <div className="form-group">
            <label>ODO Meter:</label>
            <input type="text" value={customerData.mileage || ''} readOnly />
          </div>
          <div className="form-group">
            <label>Service Options:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="serviceOption"
                  value="Checked-in"
                  checked={serviceOption === 'Checked-in'}
                  onChange={() => handleServiceOptionChange('Checked-in')}
                />
                Checked-in
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  name="serviceOption"
                  value="Tires and Wheels"
                  checked={serviceOption === 'Tires and Wheels'}
                  onChange={() => handleServiceOptionChange('Tires and Wheels')}
                />
                Tires and Wheels
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Engine:</label>
            {Object.keys(engine).map((key, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={engine[key]}
                    onChange={() => setEngine(prevState => ({ ...prevState, [key]: !prevState[key] }))}
                  />
                  {key}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Electrical Accessories:</label>
            {Object.keys(electricalAccessories).map((key, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={electricalAccessories[key]}
                    onChange={() => setElectricalAccessories(prevState => ({ ...prevState, [key]: !prevState[key] }))}
                  />
                  {key}
                </label>
              </div>
            ))}
          </div>
          <div className="form-group">
            <label>Cooling & Fuel System:</label>
            {Object.keys(coolingAndFuelSystem).map((key, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={coolingAndFuelSystem[key]}
                    onChange={() => setCoolingAndFuelSystem(prevState => ({ ...prevState, [key]: !prevState[key] }))}
                  />
                  {key}
                </label>
              </div>
            ))}
          </div>
        </form>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              marginRight: '10px',
            }}
            onClick={handleSendRecord}
          >
            Send Service Record
          </button>
          <button
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
            }}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordModal;
