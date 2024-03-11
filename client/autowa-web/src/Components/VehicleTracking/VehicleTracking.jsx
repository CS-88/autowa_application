import React, { useState } from 'react';

const VehicleTracking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  // Corrected dummy data for vehicle details
  const vehicleData = [
    { id: 1, bay: 'Parking Bay', licensePlate: 'ABC123', status: 'Parked' },
    { id: 2, bay: 'Washing Bay', licensePlate: 'XYZ789', status: 'In Progress' },
    { id: 3, bay: 'Interior Cleaning', licensePlate: 'DEF456', status: 'Completed' },
    { id: 4, bay: 'Parking Bay', licensePlate: 'GHI789', status: 'Parked' },
    { id: 5, bay: 'Washing Bay', licensePlate: 'JKL012', status: 'In Progress' },
    { id: 6, bay: 'Interior Cleaning', licensePlate: 'MNO345', status: 'Completed' },
    { id: 7, bay: 'Parking Bay', licensePlate: 'PQR678', status: 'Parked' },
    { id: 8, bay: 'Washing Bay', licensePlate: 'STU901', status: 'In Progress' },
    { id: 9, bay: 'Interior Cleaning', licensePlate: 'VWX234', status: 'Completed' },
    { id: 10, bay: 'Parking Bay', licensePlate: 'YZA567', status: 'Parked' },
    { id: 11, bay: 'Washing Bay', licensePlate: 'BCD890', status: 'In Progress' },
    { id: 12, bay: 'Interior Cleaning', licensePlate: 'EFG123', status: 'Completed' },
  ];

  return (
    <div style={{ display: 'flex', padding: '20px', height: '500px' }}>
      {/* Parking Bay Component */}
      <div style={{ flex: 1, marginRight: '20px', background: '#fff', overflowY: 'auto',padding:'10px',borderRadius: '16px'  }}>
        <h2>Parking Bay</h2>
        {vehicleData
          .filter((vehicle) => vehicle.bay === 'Parking Bay')
          .map((vehicle) => (
            <div
              key={vehicle.id}
              style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}
              onClick={() => handleVehicleSelect(vehicle)}
            >
              <h3>{vehicle.licensePlate}</h3>
              <p>Status: {vehicle.status}</p>
            </div>
          ))}
      </div>

      {/* Washing Bay Component */}
      <div style={{ flex: 1, marginRight: '20px', background: '#fff', overflowY: 'auto',padding:'10px',borderRadius: '16px' }}>
        <h2>Washing Bay</h2>
        {vehicleData
          .filter((vehicle) => vehicle.bay === 'Washing Bay')
          .map((vehicle) => (
            <div
              key={vehicle.id}
              style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}
              onClick={() => handleVehicleSelect(vehicle)}
            >
              <h3>{vehicle.licensePlate}</h3>
              <p>Status: {vehicle.status}</p>
            </div>
          ))}
      </div>

      {/* Interior Cleaning Component */}
      <div style={{ flex: 1, background: '#fff', overflowY: 'auto',padding:'10px',borderRadius: '16px'  }}>
        <h2>Interior Cleaning</h2>
        {vehicleData
          .filter((vehicle) => vehicle.bay === 'Interior Cleaning')
          .map((vehicle) => (
            <div
              key={vehicle.id}
              style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', cursor: 'pointer' }}
              onClick={() => handleVehicleSelect(vehicle)}
            >
              <h3>{vehicle.licensePlate}</h3>
              <p>Status: {vehicle.status}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VehicleTracking;
