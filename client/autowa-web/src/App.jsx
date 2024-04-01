// App.jsx

import React, { useState } from 'react';
import { UilBars, UilSignOutAlt, UilEstate, UilClipboardAlt, UilPackage, UilChart } from '@iconscout/react-unicons';
import { motion } from 'framer-motion';
import './App.css';
import './Components/Sidebar.css';
import Logo from './imgs/logo.png';
import MainDash from './Components/MainDash/MainDash';
import RightSide from './Components/RigtSide/RightSide';
import Footer from './Components/Footer/footer';
import PendingBooking from './Components/PendingBooking/PendingBooking';
import CompletedServices from './Components/CompletedServices/CompletedServices';
import VehicleTracking from './Components/VehicleTracking/VehicleTracking';
import Login from '../src/Components/Login/Login';

function App() {
  const [active, setActive] = useState("Dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    console.log('Logged in user:', userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail'); // Clear email data from local storage
    setIsLoggedIn(false); // Update isLoggedIn state
  };

  const Sidebar = ({ onSidebarItemClick }) => {
    const [selected, setSelected] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const sidebarVariants = {
      true: {
        left: '0'
      },
      false: {
        left: '-60%'
      }
    };

    const sidebarData = [
      {
        icon: UilEstate,
        heading: "Dashboard",
        onClick: () => handleMenuItemClick("Dashboard"),
      },
      {
        icon: UilClipboardAlt,
        heading: "Pending Booking",
        onClick: () => handleMenuItemClick("Pending Booking"),
      },
      {
        icon: UilPackage,
        heading: 'Completed Services',
        onClick: () => handleMenuItemClick('Completed Services'),
      },
      {
        icon: UilChart,
        heading: 'Vehicle Tracking',
        onClick: () => handleMenuItemClick('Vehicle Tracking'),
      },
    ];

    const handleMenuItemClick = (componentName) => {
      setSelected(sidebarData.findIndex(item => item.heading === componentName));
      if (onSidebarItemClick) {
        onSidebarItemClick(componentName);
      }
    };

    return (
      <>
        <div
          className="bars"
          style={expanded ? { left: '60%' } : { left: '5%' }}
          onClick={() => setExpanded(!expanded)}
        >
          <UilBars />
        </div>
        <motion.div
          className="sidebar"
          variants={sidebarVariants}
          animate={window.innerWidth <= 768 ? `${expanded}` : ''}
        >
          {/* logo */}
          <div className="logo">
            <img src={Logo} alt="logo" />
          </div>

          <div className="menu">
            {sidebarData.map((item, index) => (
              <div
                className={selected === index ? 'menuItem active' : 'menuItem'}
                key={index}
                onClick={item.onClick}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            ))}
            {/* signoutIcon */}
            <div className="menuItem" onClick={handleLogout}>
              <UilSignOutAlt />
            </div>
          </div>
        </motion.div>
      </>
    );
  };

  return (
    <div className="App">
      <div className="AppGlass">
        {isLoggedIn ? (
          <>
            <Sidebar onSidebarItemClick={setActive} />
            {active === 'Dashboard' && <MainDash />}
            {active === 'Pending Booking' && <PendingBooking />}
            {active === 'Completed Services' && <CompletedServices />}
            {active === 'Vehicle Tracking' && <VehicleTracking />}
            <RightSide />
            <Footer />
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
}

export default App;
