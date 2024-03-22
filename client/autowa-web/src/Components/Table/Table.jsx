import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import DetailsModal from "./DetailsModal";

export default function BasicTable() {
  const [tableData, setTableData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Retrieve email from localStorage
      const email = JSON.parse(localStorage.getItem('userEmail'));
      const response = await fetch("http://localhost:5500/api/booking/get", {
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
      // Set only the last 4 records
      setTableData(data.slice(-4));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAdditionalDetails = async (id) => {
    try {
      const response = await fetch("http://localhost:5500/api/booking/details/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      if (!response.ok) {
        throw new Error("Failed to fetch additional details");
      }
      const data = await response.json();
      setAdditionalDetails(data);
    } catch (error) {
      console.error("Error fetching additional details:", error);
    }
  };

  const handleDetailsClick = (row) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
    fetchAdditionalDetails(row.id); // Fetch additional details including updated status
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
    setAdditionalDetails(null);
  };

  const handleRefresh = () => {
    fetchBookings();
  };

  return (
    <div className="Table">
      <h3>Recent Bookings</h3>
      <button onClick={handleRefresh}>Refresh</button>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking Name</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {tableData.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.booking_name}
                </TableCell>
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">
                  <div className={`status-box ${row.status === 'Pending' ? 'yellow' : row.status === 'Completed' ? 'blue' : row.status === 'Approved' ? 'green' : row.status === 'Declined' ? 'red' : row.status === 'Cancelled' ? 'red': ''}`}>
                    {row.status}
                  </div>
                </TableCell>

                <TableCell align="left" className="Details">
                  <button className="detailbutton" onClick={() => handleDetailsClick(row)}>Details</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedRowData && isModalOpen && (
        <div className="popup-background">
          <DetailsModal
            rowData={selectedRowData}
            additionalDetails={additionalDetails}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </div>
  );
}
