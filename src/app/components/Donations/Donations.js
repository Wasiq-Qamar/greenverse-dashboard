import PropTypes from "prop-types";
import React, { useEffect, PureComponent } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Donations.css";

const Donations = (props) => {
  const data = [
    {
      name: "January",
      donations: 55,
      amount_total: 5000,
      amt: 1400,
    },
    {
      name: "Feburary",
      donations: 78,
      amount_total: 6500,
      amt: 1506,
    },
    {
      name: "March",
      donations: 35,
      amount_total: 9600,
      amt: 989,
    },
    {
      name: "April",
      donations: 45,
      amount_total: 7800,
      amt: 1228,
    },
    {
      name: "May",
      donations: 53,
      amount_total: 8400,
      amt: 1100,
    },
    {
      name: "June",
      donations: 12,
      amount_total: 7600,
      amt: 1700,
    },
  ];

  return (
    <div className="container">
      <h3>Donations</h3>
      <ComposedChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="donations" barSize={20} fill="#ff7300" label="asdasd" />
      </ComposedChart>
    </div>
  );
};

Donations.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, ui }) => ({
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Donations));
