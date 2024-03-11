import React, { useState } from "react";
import "./Card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, AnimateSharedLayout } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";

const Card = ({ png, color, barValue, title, value, series }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimateSharedLayout>
      {expanded ? (
        <ExpandedCard
          png={png}
          color={color}
          barValue={barValue}
          title={title}
          series={series}
          setExpanded={() => setExpanded(false)}
        />
      ) : (
        <CompactCard
          png={png}
          color={color}
          barValue={barValue}
          title={title}
          value={value}
          setExpanded={() => setExpanded(true)}
        />
      )}
    </AnimateSharedLayout>
  );
};

function CompactCard({ png: Png, color, barValue, title, value, setExpanded }) {
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
        <span>{value}</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

function ExpandedCard({ png: Png, color, barValue, title, series, setExpanded }) {
  const expandedCardStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: color?.backGround || "#ffffff",
    boxShadow: color?.boxShadow || "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  const closeButtonStyle = {
    alignSelf: "flex-end",
    cursor: "pointer",
    color: "white",
  };

  return (
    <motion.div className="ExpandedCard" style={expandedCardStyle} layoutId="expandableCard">
      <div style={closeButtonStyle}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{title}</span>
      <div className="chartContainer">
        <Chart options={{ chart: { type: "area", height: "auto" } }} series={series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;
