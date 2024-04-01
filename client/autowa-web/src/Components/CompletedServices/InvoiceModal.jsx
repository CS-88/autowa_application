import React, { useState, useEffect } from 'react';

const InvoiceModal = ({ data, onClose, customerName, customerVno, serviceEmail, customerEmail }) => {
  const [customerData, setCustomerData] = useState({
    vehicle_model: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch customer data from the backend based on customerEmail
        const response = await fetch('https://autowa-backend.onrender.com/api/customer/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Pass the customer email in the request body
          body: JSON.stringify({ email: customerEmail }),
        });

        if (response.ok) {
          const data = await response.json();
          // Update state with fetched customer data
          setCustomerData(data);
          console.log('Customer data fetched successfully:', data);
        } else {
          console.error('Failed to fetch customer data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchData();

    return () => {
      
    };
  }, [customerEmail]); 

  const [serviceOption, setServiceOption] = useState('Checked-in');
  const [service, setservice] = useState({
    car_wash: false,
    wash_and_vacum: false,
    wash_and_interior_clean_up: false,
    full_service: false
  });

  const [tel, setTel] = useState('');
  const [regNo, setRegNo] = useState('');
  const [address, setAddress] = useState('');
  const [invoice, setInvoice] = useState('');


  const modalStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const contentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '90%', // Adjust the width as needed
    maxWidth: '800px', // Set a maximum width if desired
  };

  const formStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns layout
    gap: '10px', // Gap between form elements
  };

  const handleServiceOptionChange = (option) => {
    setServiceOption(option);
  };

  const handleSendInvoice = async () => {
    const data = {
      invoice_no: invoice,
      name: customerName,
      address: address,
      tel: tel,
      date: date,
      registration_no: regNo,
      model_year: customerData.modelYear,
      vehicle_number: customerVno,
      service_center_email: serviceEmail,
      customer_email: customerEmail,
      service: service,
      service_options: {
        checked_in: serviceOption === 'Checked-in',
        tires_and_wheels: serviceOption === 'Tires and Wheels'
      },
    };

    try {
      const response = await fetch('https://autowa-backend.onrender.com/api/invoice/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        
      } else {
        
        console.error('Failed to send Invoice:', response.statusText);
      }
    } catch (error) {
      
      console.error('Error sending Invoice:', error);
    }
  };
  const date = new Date().toLocaleDateString();
  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2 style={{ marginBottom: '20px' }}>Invoice</h2>
        <form style={formStyle}>
        <div className="form-group">
            <label>Invoice No:</label>
            <input type="text" value={invoice} onChange={(e) => setInvoice(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={customerName} readOnly />
          </div>
          <div className="form-group">
            <label>Customer Email:</label>
            <input type="text" value={customerEmail} readOnly />
          </div>
          <div className="form-group">
            <label> Date:</label>
            <input type="text" value={date} readOnly />
          </div> 
          <div className="form-group">
            <label>Service Center Email:</label>
            <input type="text" value={serviceEmail} readOnly />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Tel:</label>
            <input type="tel" value={tel} onChange={(e) => setTel(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Registration No:</label>
            <input type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Model:</label>
            <input type="text" value={customerData.vehicle_model} readOnly />
          </div>
          <div className="form-group">
            <label>Vehicle No:</label>
            <input type="text" value={customerVno} readOnly />
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
            <label>Service:</label>
            {Object.keys(service).map((key, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    checked={service[key]}
                    onChange={() => setservice(prevState => ({ ...prevState, [key]: !prevState[key] }))}
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
            onClick={handleSendInvoice}
          >
            Send Invoice
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

export default InvoiceModal;
