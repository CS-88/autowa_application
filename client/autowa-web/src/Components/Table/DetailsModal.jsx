import React, { useState } from "react";
import "./DetailsModal.css";

const DetailsModal = ({ rowData, additionalDetails, onClose }) => {
  const [specialNote, setSpecialNote] = useState("");
  const [completionTime, setCompletionTime] = useState(null);

  const handleNoteChange = (event) => {
    setSpecialNote(event.target.value);
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      console.log("Completion Time:", currentTime); // Log completion time
      setCompletionTime(currentTime);
  
      const response = await fetch("https://autowa-backend.onrender.com/api/booking/set/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: rowData.id, status: newStatus, end_time: currentTime }), // Send completion time in the request
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
        {(rowData.status !== "Completed" && rowData.status !== "Cancelled" && rowData.status !== "Declined") && (
          <>
            <button onClick={() => handleUpdateStatus("Pending")}>Wait</button>
            <button onClick={() => handleUpdateStatus("Declined")}>Decline</button>
            <button onClick={() => handleUpdateStatus("Approved")}>Accept</button>
          </>
        )}
        {(rowData.status === "Pending" || rowData.status === "Approved") && (
          <button onClick={() => handleUpdateStatus("Completed")}>Complete</button>
        )}
      </div>
      {completionTime && <p>Completed at: {completionTime}</p>}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailsModal;
