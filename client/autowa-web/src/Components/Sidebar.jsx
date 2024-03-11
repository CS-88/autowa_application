import React, { useState } from "react";
import "./Sidebar.css";
import Logo from "../imgs/logo.png";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../Data/Data";
import { UilBars } from "@iconscout/react-unicons";
import { motion } from "framer-motion";

const Sidebar = ({ onSidebarItemClick }) => {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(null);

  const sidebarVariants = {
    true: {
      left: '0'
    },
    false: {
      left: '-60%'
    }
  };

  const handleMenuItemClick = (index) => {
    setSelected(index);
    setIsHovered(null); // Reset hover state when a menu item is clicked
    if (onSidebarItemClick) {
      onSidebarItemClick(SidebarData[index].componentName);
    }
  };

  const handleMenuItemHover = (index) => {
    if (!expanded) {
      setIsHovered(index);
    }
  };

  const handleBarsClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <div
        className={`bars ${expanded ? '' : 'close'}`}
        onClick={handleBarsClick}
      >
        <UilBars />
      </div>
      <motion.div
        className='sidebar'
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>

        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={`menuItem ${selected === index || isHovered === index ? 'active' : ''}`}
                key={index}
                onClick={() => handleMenuItemClick(index)}
                onMouseEnter={() => handleMenuItemHover(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
