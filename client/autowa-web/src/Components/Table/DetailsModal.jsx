import React, { useState } from "react";
import "./DetailsModal.css";

const DetailsModal = ({ rowData, additionalDetails, onClose }) => {
  const [specialNote, setSpecialNote] = useState("");

  const handleNoteChange = (event) => {
    setSpecialNote(event.target.value);
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const response = await fetch("http://localhost:5500/api/booking/set/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: rowData.id, status: newStatus }), // Change rowData.status to newStatus
      });
  
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      // Update status locally
      rowData.status = newStatus;
      onClose(); // Close modal
    } catch (error) {
      console.error("Error updating status:", error.message);
      // Handle error here, if necessary
    }
  };
  

  return (
    <div className="details-modal">
      <h2>{rowData.booking_name}</h2>
      {additionalDetails && (
        <>
          <p>Tracking ID: {rowData.id}</p>
          <p>Date: {rowData.date}</p>
          <p>Status: {rowData.status}</p>
        </>
      )}
      <textarea
        placeholder="Add special notes..."
        value={specialNote}
        onChange={handleNoteChange}
      />
      <div className="button-container">
        <button onClick={() => handleUpdateStatus("Pending")}>Wait</button>
        <button onClick={() => handleUpdateStatus("Declined")}>Decline</button>
        <button onClick={() => handleUpdateStatus("Approved")}>Accept</button>
        <button onClick={() => handleUpdateStatus("Completed")}>Complete</button>

      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailsModal;