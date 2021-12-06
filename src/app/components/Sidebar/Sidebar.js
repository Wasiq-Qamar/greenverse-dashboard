import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { logoutUser } from "../../store/auth/actions";
import { setLoading } from "../../store/gateway/actions";
import { FiUsers } from "react-icons/fi";
import { AiOutlineBank } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = (props) => {
  const { handleLogout } = props;
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/app/manage") {
      setLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="sidebar">
      <div id="burger">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div id="iconsWrapper">
        <Link to="/app">
          <div className="p-3">
            <MdOutlineDashboard size={24} color="white" />
          </div>
        </Link>
        <Link to="/app/users">
          <div className="p-3">
            <FiUsers size={24} color="white" />
          </div>
        </Link>
        <Link to="/app/accounts">
          <div className="p-3">
            <AiOutlineBank size={24} color="white" />
          </div>
        </Link>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, ui }) => ({
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logoutUser()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Sidebar));
