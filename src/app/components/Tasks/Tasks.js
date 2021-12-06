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
import "./Tasks.css";

const Tasks = (props) => {
  const data = [
    {
      name: "January",
      scheduled: 25,
      completed: 15,
      amt: 1400,
    },
    {
      name: "Feburary",
      scheduled: 35,
      completed: 23,
      amt: 1506,
    },
    {
      name: "March",
      scheduled: 15,
      completed: 14,
      amt: 989,
    },
    {
      name: "April",
      scheduled: 95,
      completed: 65,
      amt: 1228,
    },
    {
      name: "May",
      scheduled: 35,
      completed: 17,
      amt: 1100,
    },
    {
      name: "June",
      scheduled: 98,
      completed: 65,
      amt: 1700,
    },
  ];

  return (
    <div className="container">
      <h3>Tasks</h3>
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
        <Bar dataKey="scheduled" barSize={20} fill="#413ea0" label="asdasd" />
        <Line type="monotone" dataKey="completed" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

Tasks.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, ui }) => ({
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Tasks));
