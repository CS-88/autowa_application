import React, { useState, useEffect } from 'react';
import CarImage from '../PendingBooking/car.png';
import CallIcon from '../PendingBooking/call.png';
import MessageIcon from '../PendingBooking/message.png';
import UserIcon from '../PendingBooking/user-icon.png';
import StarIcon from '../PendingBooking/star-icon.png';

const PendingBookingCard = ({ booking, handleUpdateStatus }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
      <img src={CarImage} alt="Vehicle" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
      <div>
        <h3>{booking.customer_name}</h3>
        <p>{`${booking.customer_vehicle_number} - ${booking.customer_special_notes}`}</p>
        <p>{`Date: ${booking.date}, Time: ${booking.start_time} - ${booking.end_time}`}</p>
        <div>
          <img src={MessageIcon} alt="Message" style={{ width: '20px', marginRight: '5px' }} />
          <img src={CallIcon} alt="Telephone" style={{ width: '20px', marginRight: '5px' }} />
          <button onClick={() => handleUpdateStatus(booking.id, "Approved")}>Accept</button>
        </div>
      </div>
    </div>
  );
};

const InstructorCard = ({ instructor }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
      <img src={UserIcon} alt="User" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
      <div>
        <h3>{instructor.name}</h3>
        <div>
          {/* Assuming stars are represented as icons */}
          <img src={StarIcon} alt="Star" style={{ width: '20px', marginRight: '5px' }} />
          <img src={StarIcon} alt="Star" style={{ width: '20px', marginRight: '5px' }} />
          <img src={StarIcon} alt="Star" style={{ width: '20px', marginRight: '5px' }} />
          {/* Add more stars based on instructor's rating */}
        </div>
      </div>
    </div>
  );
};

const PendingBooking = () => {
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const email = JSON.parse(localStorage.getItem('userEmail'));
        const response = await fetch("https://autowa-backend.onrender.com/api/booking/get", {
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
        setPendingBookings(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBookings();
  }, []);

  const handleUpdateStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch("https://autowa-backend.onrender.com/api/booking/set/status", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: bookingId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Remove the accepted booking from the state
      setPendingBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error("Error updating status:", error.message);
    }
  };

  const instructors = [
    { id: 1, name: 'Instructor 1', rating: 4.5 },
    { id: 2, name: 'Instructor 2', rating: 4.5 },
    // Add more instructors as needed
  ];

  // Filter out bookings with status "Approved" or "Declined"
  const filteredPendingBookings = pendingBookings.filter(booking => booking.status !== "Approved" && booking.status !== "Declined" && booking.status !== "Completed" && booking.status !== "Cancelled");

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '520px' }}>
        <h2>Pending Bookings</h2>
        {filteredPendingBookings.map((booking) => (
          <PendingBookingCard key={booking.id} booking={booking} handleUpdateStatus={handleUpdateStatus} />
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '520px' }}>
        <h2>Instructors</h2>
        {instructors.map((instructor) => (
          <InstructorCard key={instructor.id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default PendingBooking;
