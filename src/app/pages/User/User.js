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

import {
  getUsers,
  removeUser,
  promoteUser,
  demoteUser,
} from "../../store/auth/actions";
import { getDonations } from "../../store/donation/actions";

const User = (props) => {
  const {
    onGetUsers,
    users,
    onGetDonations,
    donations,
    onRemoveUser,
    onPromoteUser,
    onDemoteUser,
  } = props;

  useEffect(() => {
    onGetUsers();
    onGetDonations();
  }, []);
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
                  Email
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
              {users.map((user, index) => (
                <TableRow
                  hover
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" style={{ width: 15 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" style={{ width: 40 }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="right" style={{ width: 25 }}>
                    {user.userType}
                  </TableCell>
                  <TableCell align="right" style={{ width: 15 }}>
                    {user.tasks.length}
                  </TableCell>
                  <TableCell align="right" style={{ width: 15 }}>
                    {
                      donations.filter((item) => item.userId === user._id)
                        .length
                    }
                  </TableCell>
                  <TableCell align="right" style={{ width: 30 }}>
                    <img
                      src={user.image ? user.image : avatar}
                      alt="user"
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                    />
                  </TableCell>
                  <TableCell align="right" style={{ width: 40 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => onRemoveUser({ userId: user._id })}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    {user.userType === "Manager" ? (
                      <Tooltip title="Demote">
                        <IconButton
                          onClick={() => onDemoteUser({ userId: user._id })}
                        >
                          <ManageAccountsIcon />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Promote">
                        <IconButton
                          onClick={() => onPromoteUser({ userId: user._id })}
                        >
                          <ManageAccountsIcon />
                        </IconButton>
                      </Tooltip>
                    )}
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

User.propTypes = {
  users: PropTypes.array.isRequired,
  donations: PropTypes.array.isRequired,
};

const mapStateToProps = ({ auth, donation }) => ({
  users: auth.users,
  donations: donation.donations,
});

const mapDispatchToProps = (dispatch) => ({
  onGetUsers: () => dispatch(getUsers()),
  onGetDonations: () => dispatch(getDonations()),
  onRemoveUser: (payload) => dispatch(removeUser(payload)),
  onPromoteUser: (payload) => dispatch(promoteUser(payload)),
  onDemoteUser: (payload) => dispatch(demoteUser(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
