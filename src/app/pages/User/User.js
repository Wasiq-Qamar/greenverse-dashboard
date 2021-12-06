import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import "./User.css";
import avatar from "../../../assets/media/blank-avatar.png";
import johnwick from "../../../assets/media/johnwick.jpg";
import sherlock from "../../../assets/media/sherlock.jpg";

function createData(username, title, tasks, donations, image) {
  return { username, title, tasks, donations, image };
}

const rows = [
  createData("Wasiq Qamar", "Manager", 6, 24, avatar),
  createData("Sufyan Khan", "User", 9, 37, avatar),
  createData("John Doe", "User", 8, 24, avatar),
  createData("John Wick", "Manager", 4, 67, johnwick),
  createData("Sherlock Holmes", "User", 5, 49, sherlock),
  createData("Sherlock Holmes", "User", 5, 49, sherlock),
  createData("Sherlock Holmes", "User", 5, 49, sherlock),
  createData("Sherlock Holmes", "User", 5, 49, sherlock),
  createData("Sherlock Holmes", "User", 5, 49, sherlock),
];

const User = (props) => {
  return (
    <div id="user-container">
      <Paper sx={{ width: "85vw", overflow: "hidden" }}>
        <TableContainer
          sx={{ maxHeight: 440, bgcolor: "#fff", borderRadius: 15 }}
          className="table-container"
        >
          <Table
            sx={{ bgcolor: "#fff" }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: 15 }}>ID</TableCell>
                <TableCell align="left" style={{ width: 40 }}>
                  User Name
                </TableCell>
                <TableCell align="right" style={{ width: 25 }}>
                  Title
                </TableCell>
                <TableCell align="right" style={{ width: 15 }}>
                  Enrolled Tasks
                </TableCell>
                <TableCell align="right" style={{ width: 15 }}>
                  Donations
                </TableCell>
                <TableCell align="right" style={{ width: 30 }}>
                  Image
                </TableCell>
                <TableCell align="right" style={{ width: 40 }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ width: 15 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" style={{ width: 40 }}>
                    {row.username}
                  </TableCell>
                  <TableCell align="right" style={{ width: 25 }}>
                    {row.title}
                  </TableCell>
                  <TableCell align="right" style={{ width: 15 }}>
                    {row.tasks}
                  </TableCell>
                  <TableCell align="right" style={{ width: 15 }}>
                    {row.donations}
                  </TableCell>
                  <TableCell align="right" style={{ width: 30 }}>
                    <img
                      src={row.image}
                      alt="user"
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  </TableCell>
                  <TableCell align="right" style={{ width: 40 }}>
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Change Role">
                      <IconButton>
                        <ManageAccountsIcon />
                      </IconButton>
                    </Tooltip>
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

User.propTypes = {};

User.defaultProps = {};

const mapStateToProps = ({ auth }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(User);
