import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import dashboard from "../../../assets/media/dashboard.png";
import edit from "../../../assets/media/edit.png";
import plus from "../../../assets/media/plus.png";
import { logoutUser } from "../../store/auth/actions";
import { setLoading } from "../../store/gateway/actions";
import "./Sidebar.css";

const Header = (props) => {
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
        <a id="iconLinks" href="/">
          <img alt="logo" src={dashboard} style={{ width: 20, height: 22 }} />
        </a>
        <a id="iconLinks" href="/additems">
          <img alt="logo" src={plus} style={{ width: 22, height: 22 }} />
        </a>
        <a id="iconLinks" href="/edititems">
          <img alt="logo" src={edit} style={{ width: 25, height: 25 }} />
        </a>
      </div>
    </div>
  );
};

Header.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ auth, ui }) => ({
  user: auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogout: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Header));
