import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import "./Account.css";

const orders = [
  {
    id: "6s5d4f6s5d4fs6d5f4",
    amount: "2500",
    date: "07-11-2021",
    status: "completed",
  },
  {
    id: "64d6f46sd5f464g6df",
    amount: "3000",
    date: "20-11-2021",
    status: "pending",
  },
  {
    id: "54df65s4r6f54f5ff6",
    amount: "1500",
    date: "23-11-2021",
    status: "completed",
  },
  {
    id: "6sd4f6s5d4f6d5f4s9",
    amount: "500",
    date: "05-12-2021",
    status: "pending",
  },
  {
    id: "9s8d7f9s8d7f9sd87f",
    amount: "3500",
    date: "06-12-2021",
    status: "completed",
  },
];

const donations = [
  {
    id: "8asda8sd8as8da8asd",
    amount: "7500",
    date: "08-11-2021",
    organization: "EDHI Trust",
  },
  {
    id: "6as6d6as6d6asd6a6f",
    amount: "8000",
    date: "19-11-2021",
    organization: "EDHI Trust",
  },
  {
    id: "32v3a2f3a2fg3df23a",
    amount: "6000",
    date: "23-11-2021",
    organization: "Saylani Trust",
  },
  {
    id: "4as4fd44asd4f4a4sf",
    amount: "5000",
    date: "05-12-2021",
    organization: "EDHI Trust",
  },
  {
    id: "6s6dg6gbs6dfg6adfv",
    amount: "3000",
    date: "06-12-2021",
    organization: "Saylani Trust",
  },
];

const Account = (props) => {
  return (
    <div id="user-container" className="d-flex flex-row col-12">
      <Paper
        sx={{ width: "40vw", overflow: "hidden", marginRight: 10 }}
        className="col-5.5 p-3"
      >
        <div className="d-flex flex-row">
          <h3 className="text-center col-11">Orders Summary</h3>
          <Tooltip title="Print pdf report" placement="top-end">
            <IconButton>
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
                  <TableCell align="left">{order.id}</TableCell>
                  <TableCell align="left">{order.amount}</TableCell>
                  <TableCell align="left">{order.status}</TableCell>
                  <TableCell align="left">{order.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Donations Summary */}

      <Paper sx={{ width: "40vw", overflow: "hidden" }} className="col-5.5 p-3">
        <div className="d-flex flex-row">
          <h3 className="text-center col-11">Donations Summary</h3>
          <Tooltip title="Print pdf report" placement="top-end">
            <IconButton title="Print pdf report">
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
                  <TableCell align="left">{donation.id}</TableCell>
                  <TableCell align="left">{donation.amount}</TableCell>
                  <TableCell align="left">{donation.organization}</TableCell>
                  <TableCell align="left">{donation.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

Account.propTypes = {};

Account.defaultProps = {};

const mapStateToProps = ({ auth }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
