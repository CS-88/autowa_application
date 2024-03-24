import React, { useState, useEffect } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

const CompactCard = ({ png: Png, color, barValue, title, setExpanded }) => {
  const [bookingCount, setBookingCount] = useState(null);

  useEffect(() => {
    const fetchBookingCount = async () => {
      try {
        console.log("Fetching booking count...");
        const response = await fetch("https://autowa-backend.onrender.com/api/serviceCenter/get/email", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json"
           },
          body: JSON.stringify({
            "email": "automirage@gmail.com"
          })
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(`Failed to fetch booking count: ${data.Error}`);
        }
        console.log("Booking count data:", data);
        setBookingCount(data.booking_count);
      } catch (error) {
        console.error("Error fetching booking count:", error);
      }
    };
  
    fetchBookingCount();
  }, []);
  
  const radialBarStyle = {
    background: color?.backGround || "#ffffff",
    boxShadow: color?.boxShadow || "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <motion.div
      className="CompactCard"
      style={radialBarStyle}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className="radialBar">
        <CircularProgressbar value={barValue} text={`${barValue}%`} />
        <span>{title}</span>
      </div>
      <div className="detail">
        {Png && <Png />}
        {bookingCount !== null ? (
          <span>{bookingCount}</span>
        ) : (
          <span>Loading...</span>
        )}
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
};
export default CompactCard;
