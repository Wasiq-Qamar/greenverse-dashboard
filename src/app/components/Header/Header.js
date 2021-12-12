import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Headroom from "react-headroom";
import { AiOutlinePoweroff } from "react-icons/ai";
import { connect } from "react-redux";
import dashboardWhite from "../../../assets/media/dashboardWhite.png";
import decreasing from "../../../assets/media/decreasing.png";
import graph from "../../../assets/media/graph.png";
import hourglass from "../../../assets/media/hourglass.png";
import question from "../../../assets/media/question.png";
import { logoutUser } from "../../store/auth/actions";
import { getDonations } from "../../store/donation/actions";
import { getOrders } from "../../store/order/actions";
import { getTasks } from "../../store/task/actions";
import "./Header.css";

const Header = (props) => {
  const {
    handleLogout,
    onGetDonations,
    onGetTasks,
    onGetOrders,
    orders,
    tasks,
    donations,
  } = props;

  useEffect(() => {
    onGetTasks();
    onGetDonations();
    onGetOrders();
  }, []);

  return (
    <Headroom
      style={{
        backgroundColor: "#05386b",
      }}
      id="header"
    >
      <div className="d-flex justify-content-between p-3 w-100 ">
        <div className="col-4"></div>
        <div className="col-4  d-flex flex-row justify-content-center align-items-center">
          <img
            src={dashboardWhite}
            alt="Greenverse Logo"
            className="img-fluid logo"
            style={{ width: 30, height: 30, marginTop: -10, marginRight: 15 }}
          />
          <h2
            className="text-white mr-10px"
            style={{ fontWeight: "bold", letterSpacing: 1 }}
          >
            Admin Dashboard
          </h2>
        </div>
        <div className="d-flex flex-row justify-content-end col-4">
          <AiOutlinePoweroff
            className=" mx-2 h6 text-white  cursor-pointer"
            size="2em"
            onClick={handleLogout}
          />
        </div>
      </div>

      <div className="details ">
        <div id="pendingOrder">
          <p style={{ color: "#F88807", fontSize: 15, marginBottom: 5 }}>
            Total Tasks
          </p>
          <div>
            <p style={{ fontSize: 30, margin: 0, padding: 0 }}>
              {tasks ? tasks.length : "N/A"}
            </p>
            <span
              style={{
                width: 40,
                height: 40,
                padding: 5,
                borderRadius: 20,
                background: "#F88807",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="img"
                src={decreasing}
                style={{ width: 20, height: 20 }}
              />
            </span>
          </div>
        </div>

        <div id="actionNeeded">
          <p style={{ color: "#F53C56", fontSize: 15, marginBottom: 5 }}>
            Total Donations
          </p>
          <div>
            <p style={{ fontSize: 30, margin: 0, padding: 0 }}>
              {donations ? donations.length : "N/A"}
            </p>
            <span
              style={{
                width: 40,
                height: 40,
                padding: 5,
                borderRadius: 20,
                background: "#F53C56",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img alt="img" src={question} style={{ width: 20, height: 20 }} />
            </span>
          </div>
        </div>

        <div id="awaitngOrders">
          <p style={{ color: "grey", fontSize: 15, marginBottom: 5 }}>
            Ongoing Tasks
          </p>
          <div>
            <p style={{ fontSize: 30, margin: 0, padding: 0 }}>
              {tasks ? tasks.length : "N/A"}
            </p>
            <span
              style={{
                width: 40,
                height: 40,
                padding: 5,
                borderRadius: 20,
                background: "grey",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt="img"
                src={hourglass}
                style={{ width: 20, height: 20 }}
              />
            </span>
          </div>
        </div>

        <div id="ordered">
          <p style={{ color: "#11CDEF", fontSize: 15, marginBottom: 5 }}>
            Greenstore Orders
          </p>
          <div>
            <p style={{ fontSize: 30, margin: 0, padding: 0 }}>
              {orders ? orders.length : "N/A"}
            </p>
            <span
              style={{
                width: 40,
                height: 40,
                padding: 5,
                borderRadius: 20,
                background: "#11CDEF",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img alt="img" src={graph} style={{ width: 20, height: 20 }} />
            </span>
          </div>
        </div>
      </div>
    </Headroom>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  donations: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = ({ auth, order, task, donation }) => ({
  user: auth.user,
  orders: order.orders,
  donations: donation.donations,
  tasks: task.tasks,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logoutUser()),
  onGetDonations: () => dispatch(getDonations()),
  onGetOrders: () => dispatch(getOrders()),
  onGetTasks: () => dispatch(getTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
