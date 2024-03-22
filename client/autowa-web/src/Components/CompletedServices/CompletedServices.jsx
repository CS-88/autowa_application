import React, { useState, useEffect } from 'react';
import Car from './car.png';
import InvoiceModal from '../CompletedServices/InvoiceModal';
import RecordModal from '../CompletedServices/recordModal';

const CompletedServicesCard = ({ task, onSelect, booking }) => {
  // Check if booking is available before rendering
  if (!booking) {
    return null;
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(task)}
    >
      <img src={Car} alt="car" style={{ maxWidth: '10%', marginRight: '10px' }} />
      <div>
        <h3>{booking.customer_name}</h3>
        <p>ID: {booking.id}</p>
        <p>{`${booking.customer_vehicle_number}`}</p>
        <p>{`Date: ${booking.date}, Time: ${booking.start_time} - ${booking.end_time}`}</p>
      </div>
    </div>
  );
};

const CompletedServicesDetails = ({ selectedTask, onCloseModal }) => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const handleViewServiceRecord = () => {
    setIsRecordModalOpen(true);
  };

  const openInvoiceModal = () => {
    setIsInvoiceModalOpen(true);
  };

  useEffect(() => {
    setIsInvoiceModalOpen(false);
    setIsRecordModalOpen(false);
  }, [selectedTask]);

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', flex: 1 }}>
      {selectedTask ? (
        <>
          <img src={Car} alt="car" style={{ maxWidth: '10%', marginBottom: '2px' }} />
          <h2>{selectedTask.customer_name}</h2>
          <h3>{selectedTask.id}</h3>
          <p>{selectedTask.customer_special_notes ? selectedTask.customer_special_notes : "No special note"}</p>
          <div>
            <button onClick={handleViewServiceRecord}>Create Service Record</button>
            <button onClick={openInvoiceModal}>Update Invoice</button>
          </div>
          {isInvoiceModalOpen && (
            
            <InvoiceModal
              data={selectedTask} 
              onClose={onCloseModal}
              customerName={selectedTask.customer_name} 
              customerVno={selectedTask.customer_vehicle_number} 
              customerEmail={selectedTask.customer_email}
              serviceEmail={selectedTask.service_center_email} 

              />
          )}
          
          {console.log("ID in CompletedServicesDetails:", selectedTask.id)}

          {isRecordModalOpen && (
            <RecordModal
              customerName={selectedTask.customer_name} 
              customerVno={selectedTask.customer_vehicle_number} 
              serviceEmail={selectedTask.service_center_email} 
              customerEmail={selectedTask.customer_email}
              onClose={onCloseModal}
            />
          )}
</>
      ) : (
        <p>Select a task to view details</p>
      )}
    </div>
  );
};

const CompletedServices = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasksData, setTasksData] = useState([]);

  const fetchBookings = async () => {
    try {
      const email = JSON.parse(localStorage.getItem('userEmail'));
      const response = await fetch("http://localhost:5500/api/booking/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "service_center_email": email })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      // Filter out approved, declined, and pending bookings
      const completedBookings = data.filter(booking => !['approved', 'declined', 'pending','cancelled'].includes(booking.status.toLowerCase()));
      setTasksData(completedBookings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, overflowY: 'auto', maxHeight: '500px' }}>
        {tasksData.map((task) => (
          <CompletedServicesCard key={task.id} task={task} onSelect={handleTaskSelect} booking={task} />
        ))}
      </div>
      <CompletedServicesDetails selectedTask={selectedTask} onCloseModal={handleCloseModal} />
    </div>
  );
};

export default CompletedServices;
