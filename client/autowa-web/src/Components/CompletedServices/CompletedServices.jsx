import React, { useState } from 'react';
import Car from './car.png'; // Update the path accordingly
import InvoiceModal from './InvoiceModal';
import RecordModal from './recordModal'; // Corrected import path

const CompletedServicesCard = ({ task, onSelect }) => {
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
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
    </div>
  );
};

const CompletedServicesDetails = ({ selectedTask }) => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

  const handleViewServiceRecord = () => {
    setIsRecordModalOpen(true);
  };

  const openInvoiceModal = () => {
    setIsInvoiceModalOpen(true);
  };

  const closeModals = () => {
    setIsInvoiceModalOpen(false);
    setIsRecordModalOpen(false);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', flex: 1 }}>
      {selectedTask ? (
        <>
          <img src={Car} alt="car" style={{ maxWidth: '10%', marginBottom: '2px' }} />
          <h2>{selectedTask.title}</h2>
          <p>{selectedTask.description}</p>
          <div>
            <button onClick={handleViewServiceRecord}>View Service Record</button>
            <button onClick={openInvoiceModal}>Update Invoice</button>
          </div>
          {isInvoiceModalOpen && (
            <InvoiceModal
              data={selectedTask} // Pass the necessary data here
              onClose={closeModals}
            />
          )}
          {isRecordModalOpen && (
            <RecordModal
              data={selectedTask} // Pass the necessary data here
              onClose={closeModals}
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

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
  };

  const tasksData = [
    { id: 1, title: 'CAL 7021', description: 'Car wash,interior' },
    { id: 2, title: 'CAN 4586', description: 'Full service' },
    { id: 3, title: 'CAI 4545', description: 'Full Service' },
    { id: 4, title: 'KI 4554', description: 'Interior clening' },
    { id: 5, title: 'CBA 7878', description: 'Body wash' },
    { id: 6, title: 'CAQ 2222', description: 'Full service' },
    { id: 7, title: 'CAP 4875', description: 'Description for Task 1' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 2, overflowY: 'auto', maxHeight: '500px' }}>
        {tasksData.map((task) => (
          <CompletedServicesCard key={task.id} task={task} onSelect={handleTaskSelect} />
        ))}
      </div>
      <CompletedServicesDetails selectedTask={selectedTask} />
    </div>
  );
};

export default CompletedServices;
