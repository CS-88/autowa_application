import React from 'react';
import CarImage from '../PendingBooking/car.png';
import CallIcon from '../PendingBooking/call.png';
import MessageIcon from '../PendingBooking/message.png';
import UserIcon from '../PendingBooking/user-icon.png';
import StarIcon from '../PendingBooking/star-icon.png';

const PendingBookingCard = ({ booking }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', width: '300px' }}>
      <img src={CarImage} alt="Vehicle" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
      <div>
        <h3>{booking.ownerName}</h3>
        <p>{`${booking.carModel} - ${booking.serviceType}`}</p>
        <div>
          <img src={MessageIcon} alt="Message" style={{ width: '20px', marginRight: '5px' }} />
          <img src={CallIcon} alt="Telephone" style={{ width: '20px', marginRight: '5px' }} />
          <button>Accept</button>
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
  const pendingBookings = [
    { id: 1, ownerName: 'John Doe', carModel: 'Toyota Camry', serviceType: 'Oil Change' },
    { id: 2, ownerName: 'John Doe', carModel: 'Toyota Camry', serviceType: 'Oil Change' },
    { id: 1, ownerName: 'John Doe', carModel: 'Toyota Camry', serviceType: 'Oil Change' },
    { id: 2, ownerName: 'John Doe', carModel: 'Toyota Camry', serviceType: 'Oil Change' },
    // Add more pending bookings as needed
  ];

  const instructors = [
    { id: 1, name: 'Instructor 1', rating: 4.5 },
    { id: 2, name: 'Instructor 2', rating: 4.5 },
    { id: 1, name: 'Instructor 1', rating: 4.5 },
    { id: 2, name: 'Instructor 2', rating: 4.5 },
    // Add more instructors as needed
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1, overflowY: 'auto', maxHeight: '520px' }}>
        <h2>Pending Bookings</h2>
        {pendingBookings.map((booking) => (
          <PendingBookingCard key={booking.id} booking={booking} />
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
