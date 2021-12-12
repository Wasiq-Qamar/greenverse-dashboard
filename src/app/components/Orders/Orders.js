import PropTypes from "prop-types";
import React, { useEffect, PureComponent } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

import "./Orders.css";

const Orders = (props) => {
  const data = [
    { name: "Completed", value: 450 },
    { name: "Pending", value: 350 },
    { name: "Cancelled", value: 200 },
  ];

  const COLORS = ["#00C49F", "#0088FE", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: 10 }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="container">
      <h3>Orders</h3>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="d-flex flex-row">
        <div className="d-flex flex-row px-2">
          <div
            style={{ width: 13, height: 10, backgroundColor: "#00C49F" }}
          ></div>
          <div style={{ marginTop: -5, paddingLeft: 5, color: "#00C49F" }}>
            Completed
          </div>
        </div>
        <div className="d-flex flex-row px-2">
          <div
            style={{ width: 13, height: 10, backgroundColor: "#0088FE" }}
          ></div>
          <div style={{ marginTop: -5, paddingLeft: 5, color: "#0088FE" }}>
            Pending
          </div>
        </div>
        <div className="d-flex flex-row px-2 ">
          <div
            style={{ width: 13, height: 10, backgroundColor: "#FF8042" }}
          ></div>
          <div style={{ marginTop: -5, paddingLeft: 5, color: "#FF8042" }}>
            Cancelled
          </div>
        </div>
      </div>
    </div>
  );
};

Orders.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
};

const mapStateToProps = ({ auth, order }) => ({
  user: auth.user,
  orders: order.orders,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Orders));
