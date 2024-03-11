// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilPackage,
  UilChart,
  UilSignOutAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports

import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img2.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img2.png";
import { useAnimation } from "framer-motion";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Pending Booking",
  },
  {
    icon: UilUsersAlt,
    heading: "Customers",
  },
  {
    icon: UilPackage,
    heading: 'Completed Services'
  },
  {
    icon: UilChart,
    heading: 'Vehicle Tracking'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Bookings",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 75,
    value: "25,970",
    png: UilChart,
    series: [
      {
        name: "Sales",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  
 
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Dhanuka CAL-7027",
    noti: "I want to scan my car",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Nishad CAI-1548",
    noti: "My fuel censor is not working. check that",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Sulthan CAT-7845 ",
    noti: "check Hybrid Bettary",
    time: "2 hours ago",
  },
];
