import React, { useState } from 'react';
import Car from './car.png'; // Update the path accordingly
import InvoiceModal from './InvoiceModal';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewServiceRecord = () => {
    // Implement logic for viewing service record
    console.log('Viewing service record...');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <button onClick={openModal}>Update Invoice</button>
          </div>
          {isModalOpen && (
            <InvoiceModal
              data={selectedTask} // Pass the necessary data here
              onClose={closeModal}
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
    { id: 1, title: 'Task 1', description: 'Description for Task 1' },
    { id: 2, title: 'Task 2', description: 'Description for Task 2' },
    { id: 3, title: 'Task 3', description: 'Description for Task 3' },
    { id: 4, title: 'Task 4', description: 'Description for Task 4' },
    { id: 5, title: 'Task 5', description: 'Description for Task 5' },
    { id: 6, title: 'Task 6', description: 'Description for Task 6' },
    { id: 7, title: 'Task 7', description: 'Description for Task 1' },
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
