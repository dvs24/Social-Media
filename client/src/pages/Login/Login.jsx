import React from "react";
import logo from "../../img/logo.png";
import "./Login.css";
import Auth from "../Auth/Auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../actions/AuthAction";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate} from "react-router-dom";
const Login = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  // const user = useSelector((state)=>state.authReducer.authdata.user);
  // const error = useSelector((state) => state.authReducer.error);

  const [active, setActive] = useState("login");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  });
  const [confirmPass, setConfirmPass] = useState(true);
  // const [noExist, setNoExist] = useState(false);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    dispatch(logIn(data)).then((res) => {
      console.log(res);
      if (res === 200) {
        toast.success("Login successful" , {
          duration: 4000,
          position: "top-right",
        })
      } 
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Toaster />
      {active === "login" && (
        <div className="login">
          <div className="loginLeft">
            <img src={logo} alt="" />

            <div className="loginInfo">
              <h1>DVS</h1>
              <h6>Explore the idea throughout the world</h6>
            </div>
          </div>

          <div className="loginRight">
            <h3>Login</h3>

            <form className="loginForm" onSubmit={handleSubmitLogin}>
              <div className="loginPass">
                <input
                  type="text"
                  name="username"
                  placeholder="UserName"
                  onChange={handleChange}
                  autoComplete="username"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              {/* {noExist && <span style={{ color: 'red', fontSize: '15px', alignSelf: 'flex-end', margin: '15px' }}>
                *User does not exist
              </span> } */}
              <div className="loginBtn">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => setActive("signUp")}
                >
                  Don't Have Account? Sign Up
                </span>
                <button type="submit">{loading ? "Loading" : "Log In"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {active === "signUp" && (
        <Auth
          active={active}
          setActive={setActive}
          handleChange={handleChange}
          data={data}
          confirmPass={confirmPass}
          setConfirmPass={setConfirmPass}
        />
      )}
    </>
  );
};

export default Login;
