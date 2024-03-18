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
        <h2 style={{ marginBottom: '20px' }}>INSPECTION REPORT</h2>
        <form style={formStyle}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" value={data.name} readOnly />
          </div>
         
          
          <div className="form-group">
            <label>Date:</label>
            <input type="date" readOnly />
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
            <label>ODO Meter:</label>
            <input type="text" readOnly />
          </div>
        
          <div className="form-group">
            <label>Service Options:</label>
            <div>
              <label>
                <input
                  type="radio"
                  name="serviceOption"
                  value="Checked-in"
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
                  onChange={() => handleServiceOptionChange('Tires and Wheels')}
                />
                Tires and Wheels
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Engine:</label>
            <div>
              <label>
                <input type="checkbox" value="Oil Leavel/Condition" /> Oil Leavel/Condition
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Mount/Tenstionrs" /> Mount/Tenstionrs
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Steering Oil Leavel" /> Steering Oil Leavel
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Transmisson Oil " /> Transmisson Oil 
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Cooling & Fuel System:</label>
            <div>
              <label>
                <input type="checkbox" value="Radiator Coolent" /> Radiator Coolent
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="A/C Fan" /> A/C Fan
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Air Filter" /> Air Filter
              </label>
            </div>
            
          </div>
          <div className="form-group">
            <label>Electrical Accessories:</label>
            <div>
              <label>
                <input type="checkbox" value="Horn" /> Horn
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Wipers/Washers" /> Wipers/Washers
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Radio" /> Radio
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Heater" /> Heater
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Air Coditioner" /> Air Coditioner
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Temp.Gauge" /> Temp.Gauge
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="OilLight/Gauge" /> OilLight/Gauge
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Instrumnets w/Light" /> Instrumnets w/Light
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="SRS Function w/Light" /> SRS Function w/Light
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="ABS w/light" /> ABS w/light
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Front Light" /> Front Light
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Rear Light" /> Rear Light
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Power shutters" /> Power shutters
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" value="Electrical Mirror" /> Electrical Mirror
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

export default InvoiceModal;
