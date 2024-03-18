import React, { useState } from 'react';

const InvoiceModal = ({ data, onClose, onSendInvoice }) => {
  const [serviceOption, setServiceOption] = useState('Checked-in');
  const [carWashChecked, setCarWashChecked] = useState(false);
  const [washVacuumChecked, setWashVacuumChecked] = useState(false);
  const [washInteriorCleanUpChecked, setWashInteriorCleanUpChecked] = useState(false);
  const [fullServiceChecked, setFullServiceChecked] = useState(false);

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

  const handleSendInvoice = () => {
    // Implement logic for sending the invoice
    console.log('Sending invoice...');
    // Call the onSendInvoice prop if provided
    if (onSendInvoice) {
      onSendInvoice();
    }
  };

  const handleCarWashChange = () => {
    setCarWashChecked(!carWashChecked);
  };

  const handleWashVacuumChange = () => {
    setWashVacuumChecked(!washVacuumChecked);
  };

  const handleWashInteriorCleanUpChange = () => {
    setWashInteriorCleanUpChecked(!washInteriorCleanUpChecked);
  };

  const handleFullServiceChange = () => {
    setFullServiceChecked(!fullServiceChecked);
  };

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <h2 style={{ marginBottom: '20px' }}>Invoice</h2>
        <form style={formStyle}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={data.name} readOnly />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" value={data.address} readOnly />
          </div>
          <div className="form-group">
            <label>Tel:</label>
            <input type="tel" value={data.tel} readOnly />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <input type="date" readOnly />
          </div>
          <div className="form-group">
            <label>Registration No:</label>
            <input type="text" readOnly />
          </div>
          <div className="form-group">
            <label>Model/Year:</label>
            <input type="text" readOnly />
          </div>
          <div className="form-group">
            <label>Vehicle No:</label>
            <input type="text" readOnly />
          </div>
          <div className="form-group">
            <label>Autowa Invoice</label>
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
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Car wash"
                  checked={carWashChecked}
                  onChange={handleCarWashChange}
                />{' '}
                Car wash
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Wash & Vacuum"
                  checked={washVacuumChecked}
                  onChange={handleWashVacuumChange}
                />{' '}
                Wash & Vacuum
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Wash & Interior Clean Up"
                  checked={washInteriorCleanUpChecked}
                  onChange={handleWashInteriorCleanUpChange}
                />{' '}
                Wash & Interior Clean Up
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="Full Service"
                  checked={fullServiceChecked}
                  onChange={handleFullServiceChange}
                />{' '}
                Full Service
              </label>
            </div>
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
