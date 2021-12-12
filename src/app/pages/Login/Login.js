import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { MdVerifiedUser } from "react-icons/md";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import GreenVerseLogo from "../../../assets/media/logo.png";
import { getSessionCookie } from "../../../utility/session";
import {
  loginUser,
  removeAuthAlerts,
  setLogin,
} from "../../store/auth/actions";
import "./Login.css";

const Login = (props) => {
  const alert = useAlert();
  const {
    isLogin,
    onSetLogin,
    onSetLocalLogin,
    onRemoveAuthAlerts,
    authError,
  } = props;
  const history = useHistory();

  const [state, setState] = useState({ email: "", password: "" });

  useEffect(() => {
    if (authError) {
      alert.error(authError);
      onRemoveAuthAlerts();
      // eslint-disable-next-line no-empty
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authError]);

  useEffect(() => {
    if (isLogin) {
      history.push("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  useEffect(() => {
    if (getSessionCookie("token")) {
      onSetLocalLogin(JSON.parse(getSessionCookie("user")));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LoginMethod = async (e) => {
    e.preventDefault();
    onSetLogin(state, () => {
      history.push("/app");
    });
  };

  const getInputValue = (inputName) => state[inputName] || "";

  const onChangeInput = (event) => {
    const { value, name } = event.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="loginPage">
      <div id="main-content" className="main-content">
        <div className="container-fluid ">
          <div className="row justify-content-center">
            <div className="col-lg-35p col-800-50p">
              <div id="loginBox">
                <div className="d-flex flex-center  ">
                  <span>
                    <img
                      src={GreenVerseLogo}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  </span>
                </div>
                <div className="gradient-bt">
                  <div className="body p-24px pb-5px">
                    <form onSubmit={LoginMethod}>
                      <div className="my-15px">
                        <input
                          type="text"
                          placeholder="Email"
                          name="email"
                          value={getInputValue("email")}
                          onChange={onChangeInput}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-25px">
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={getInputValue("password")}
                          onChange={onChangeInput}
                          className="form-control"
                        />
                      </div>

                      <div className="mb-20px">
                        <button
                          type="submit"
                          className="btn mb-20px"
                          disabled={!state.email || !state.password}
                        >
                          <MdVerifiedUser className="mr-3px" />
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  authError: PropTypes.string.isRequired,
  authSuccess: PropTypes.string.isRequired,
  onSetLogin: PropTypes.func.isRequired,
  onSetLocalLogin: PropTypes.func.isRequired,
  onRemoveAuthAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  authError: auth.authError,
  authSuccess: auth.authSuccess,
});

const mapDispatchToProps = (dispatch) => ({
  onSetLogin: (payload) => dispatch(loginUser(payload)),
  onSetLocalLogin: (payload) => dispatch(setLogin(payload)),
  onRemoveAuthAlerts: () => dispatch(removeAuthAlerts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
