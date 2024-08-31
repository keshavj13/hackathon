import React, { useState } from 'react';


const generateTimeSlots = () => {
  const slots = [];
  const startTime = new Date();
  startTime.setHours(10, 0, 0);
  const endTime = new Date();
  endTime.setHours(19, 0, 0);

  while (startTime < endTime) {
    const slot = new Date(startTime);
    slots.push(slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    startTime.setMinutes(startTime.getMinutes() + 30);
  }
  return slots;
};

const BookingSystem = () => {
  const initialSlots = generateTimeSlots();
  const [doctorABooked, setDoctorABooked] = useState({});
  const [doctorBBooked, setDoctorBBooked] = useState({});
  const [bookings, setBookings] = useState({});
 
  const bookSlot = (slot, type) => {
    const isDoctorABooked = doctorABooked[slot];
    const isDoctorBBooked = doctorBBooked[slot];

  
    if (isDoctorABooked && isDoctorBBooked) {
      alert('No available slots for this time.');
      return;
    }

    switch (type) {
      case 'clinic':
        if (!isDoctorABooked && !isDoctorBBooked) {
          if (Math.random() < 0.5) {
            setDoctorABooked(prev => ({ ...prev, [slot]: true }));
          } else {
            setDoctorBBooked(prev => ({ ...prev, [slot]: true }));
          }
        } else if (!isDoctorABooked) {
          setDoctorABooked(prev => ({ ...prev, [slot]: true }));
        } else if (!isDoctorBBooked) {
          setDoctorBBooked(prev => ({ ...prev, [slot]: true }));
        } else {
          alert('No available slots for this time.');
        }
        break;
      case 'doctorA':
        if (!isDoctorABooked) {
          setDoctorABooked(prev => ({ ...prev, [slot]: true }));
        } else {
          alert('Doctor A is already booked for this time.');
        }
        break;
      case 'doctorB':
        if (!isDoctorBBooked) {
          setDoctorBBooked(prev => ({ ...prev, [slot]: true }));
        } else {
          alert('Doctor B is already booked for this time.');
        }
        break;
      default:
        break;
    }
    setBookings(prev => ({
      ...prev,
      [slot]: {
        clinic: isDoctorABooked || isDoctorBBooked,
        doctorA: type === 'doctorA' || isDoctorABooked,
        doctorB: type === 'doctorB' || isDoctorBBooked,
      }
    }));
  };
  const clearBookings = () => {
    setBookings({});
    setDoctorABooked({});
    setDoctorBBooked({});
  };

  return (
    <div style={{ backgroundColor:'#eeeee4',padding: '20px', fontFamily: 'Arial' }}>

     <div className="header">
      <img src="public\ayurveda.png" alt="Logo" className="header-logo" />
     </div>
      
      <div>
        <button onClick={clearBookings} style={{ marginBottom: '20px',marginTop: '5px', padding: '10px 15px', backgroundColor: '#35C881', color: '#fff', border: 'none', borderRadius: '5px' }}>
          Clear All Slots
        </button>
      </div>
      <h3>Available Time Slots</h3>
      <ul style={{ listStyle: 'none', padding: '0', }}>
        {initialSlots.map(slot => (
          <li key={slot} style={{ margin: '10px 0' }}>
            <span>{slot}</span>
            <button onClick={() => bookSlot(slot, 'clinic')} style={{ marginLeft: '10px',backgroundColor: '#35C881' }}>
              Book Clinic
            </button>
            <button onClick={() => bookSlot(slot, 'doctorA')} style={{ marginLeft: '10px',backgroundColor: '#35C881' }}>
              Book Doctor 1
            </button>
            <button onClick={() => bookSlot(slot, 'doctorB')} style={{ marginLeft: '10px',backgroundColor: '#35C881' }}>
              Book Doctor 2
            </button>
          </li>
        ))}
      </ul>
      <h3>Booked Slots</h3>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {Object.keys(bookings).map(slot => (
          <li key={slot}>
            {slot} - {bookings[slot].doctorA ? 'Doctor 1' : ''} {bookings[slot].doctorB ? 'Doctor 2' : ''} {bookings[slot].clinic ? 'Clinic' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingSystem;
