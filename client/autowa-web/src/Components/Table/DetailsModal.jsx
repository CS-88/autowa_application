import React, { useState } from "react";
import "./DetailsModal.css"; // You can style your modal in this file

const DetailsModal = ({ rowData, onClose, onUpdateStatus }) => {
  const [specialNote, setSpecialNote] = useState("");

  const handleNoteChange = (event) => {
    setSpecialNote(event.target.value);
  };

  const handleUpdateStatus = (newStatus) => {
    onUpdateStatus({ ...rowData, specialNote: specialNote }, newStatus);
    onClose();
  };

  return (
    <div className="details-modal">
      <h2>{rowData.name}</h2>
      <p>Tracking ID: {rowData.trackingId}</p>
      <p>Date: {rowData.date}</p>
      <p>Status: {rowData.status}</p>
      <textarea
        placeholder="Add special notes..."
        value={specialNote}
        onChange={handleNoteChange}
      />
      <div className="button-container">
        <button onClick={() => handleUpdateStatus("Wait")}>Wait</button>
        <button onClick={() => handleUpdateStatus("Decline")}>Decline</button>
        <button onClick={() => handleUpdateStatus("Accept")}>Accept</button>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailsModal;
