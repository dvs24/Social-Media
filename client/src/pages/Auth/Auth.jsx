import React from "react";
import "./Auth.css";
import logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../../actions/AuthAction";
import toast, { Toaster } from "react-hot-toast";

const Auth = (props) => {
  const loading = useSelector((state) => state.authReducer.loading);

  const dispatch = useDispatch();
  const handleSubmitAuth = (e) => {
    e.preventDefault();

    if (props.data.password !== props.data.confirmpass) {
      props.setConfirmPass(false);
    } else {
      dispatch(signUp(props.data)).then((res) => {
        if (res === 200) {
          toast.success("Successfully Register", {
            duration: 4000,
            position: "top-right",
          });
        } else {
          toast.error("Something went wrong", {
            duration: 4000,
            position: "top-right",
          });
        }
      });
      props.setConfirmPass(true);
    }
  };

  return (
    <>
      <Toaster />
      <div className="auth">
        {/* Left Side */}
        <div className="authLeft">
          <img src={logo} alt="" />

          <div className="authInfo">
            <h1>DVS</h1>
            <h6>Explore the idea throughout the world</h6>
          </div>
        </div>
        {/* Right Side */}
        <div className="authRight">
          <h3>Sign Up</h3>
          <form className="infoForm" onSubmit={handleSubmitAuth}>
            <div className="namePass">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={props.handleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={props.handleChange}
              />
            </div>
            <div className="userName">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={props.handleChange}
              />
            </div>
            <div className="namePass">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={props.handleChange}
              />
              <input
                type="password"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={props.handleChange}
              />
            </div>
            {!props.confirmPass && (
              <span
                style={{
                  color: "red",
                  fontSize: "15px",
                  alignSelf: "flex-end",
                  margin: "15px",
                }}
              >
                *Confirm password is not the same
              </span>
            )}
            {/* {exist? <span style={{ color: 'red', fontSize: '15px', alignSelf: 'flex-end', margin: '15px' }}>
                *User is already exist
              </span> :''
            }  */}
            <div className="formBtn">
              <span
                style={{ cursor: "pointer" }}
                onClick={() => props.setActive("login")}
              >
                Already have an account? Login
              </span>
              <button type="submit">{loading ? "Loading" : "Sign Up"}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
