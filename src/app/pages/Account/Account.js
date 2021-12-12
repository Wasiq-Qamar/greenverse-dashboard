import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { useReactToPrint } from "react-to-print";
import "./Account.css";

const Account = (props) => {
  const { orders, donations } = props;
  const donationsRef = useRef();
  const handlePrintDonations = useReactToPrint({
    content: () => donationsRef.current,
    documentTitle: "Donations Summary",
    copyStyles: false,
  });
  const ordersRef = useRef();
  const handlePrintOrders = useReactToPrint({
    content: () => ordersRef.current,
    documentTitle: "Orders Summary",
    copyStyles: false,
  });

  return (
    <div id="accounts-container" className="d-flex flex-row col-12">
      <Paper
        sx={{ width: "40vw", overflow: "hidden", marginRight: 1 }}
        className="col-6 p-3"
        ref={ordersRef}
      >
        <div className="d-flex flex-row">
          <h3 className="text-center col-11">Orders Summary</h3>
          <Tooltip title="Print pdf report" placement="top-end">
            <IconButton onClick={handlePrintOrders}>
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </div>
        <TableContainer
          sx={{ maxHeight: 400, bgcolor: "#fff", borderRadius: 15 }}
          className="table-container"
        >
          <Table
            sx={{ bgcolor: "#fff" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Order ID</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{order._id}</TableCell>
                  <TableCell align="left">{order.amount}</TableCell>
                  <TableCell align="left">Pending</TableCell>
                  <TableCell align="left">
                    {order.orderDate.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Donations Summary */}

      <Paper
        sx={{ width: "40vw", overflow: "hidden" }}
        className="col-6 p-3"
        ref={donationsRef}
      >
        <div className="d-flex flex-row">
          <h3 className="text-center col-11">Donations Summary</h3>
          <Tooltip title="Print pdf report" placement="top-end">
            <IconButton title="Print pdf report" onClick={handlePrintDonations}>
              <PictureAsPdfIcon />
            </IconButton>
          </Tooltip>
        </div>
        <TableContainer
          sx={{ maxHeight: 400, bgcolor: "#fff", borderRadius: 15 }}
          className="table-container"
        >
          <Table
            sx={{ bgcolor: "#fff" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="left">Donation ID</TableCell>
                <TableCell align="left">Amount</TableCell>
                <TableCell align="left">Organization</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donations.map((donation, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{donation._id}</TableCell>
                  <TableCell align="left">{donation.amount}</TableCell>
                  <TableCell align="left">{donation.organization}</TableCell>
                  <TableCell align="left">
                    {donation.donationDate.split("T")[0]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

Account.propTypes = {
  orders: PropTypes.array.isRequired,
  donations: PropTypes.array.isRequired,
};

Account.defaultProps = {};

const mapStateToProps = ({ auth, order, donation }) => ({
  orders: order.orders,
  donations: donation.donations,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
