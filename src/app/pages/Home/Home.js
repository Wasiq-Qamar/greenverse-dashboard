import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Button,
  Nav,
  NavItem,
  NavLink,
  Spinner,
  TabContent,
  TabPane,
} from "reactstrap";
import Tasks from "../../components/Tasks";
import Donations from "../../components/Donations";
import Orders from "../../components/Orders";
import "./Home.css";

const Home = (props) => {
  return (
    <div id="home-container" className="col-12 ">
      <div className="col-6">
        <Tasks />
      </div>
      <div className="col-6 ">
        <Donations />
      </div>
      <div className="col-6">
        <Orders />
      </div>
    </div>
  );
};

Home.propTypes = {};

Home.defaultProps = {};

const mapStateToProps = ({ auth }) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
