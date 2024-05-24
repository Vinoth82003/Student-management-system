import React, { useContext, useState } from "react";
import axios from "axios";
import {
  faEnvelope,
  faLock,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../App";

const Login = ({ setSignup, setPopup, setPopupData }) => {
  const context = useContext(AppContext);

  const handlePopup = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 6000);
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [user, setUser] = useState(null);
  // const [imageName, setImageName] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );
      console.log(response.data);
      // // let pathSplit = response.data.imagePath.split("\\");
      // // console.log(pathSplit[pathSplit.length - 1]);
      // // let imageName = pathSplit[pathSplit.length - 1];
      // // let newResponse = response.data.imagePath;
      // // newResponse.imagePath = imageName;
      // // console.log(newResponse);
      context.setUserId(response.data.userId);
      context.setAuth(true);
    } catch (err) {
      console.error(err);
      setPopupData({
        status: "error",
        message: err.message,
      });
      handlePopup();
    }
  };

  return (
    <>
      <div className="form-container form-login">
        <form onSubmit={handleSubmit} className="form-signup ">
          <h1 className="color-txt">Sign in</h1>

          <div className="input-field">
            <label>
              <div className="lbl-icon">
                <FontAwesomeIcon icon={faEnvelope} />
              </div>
              E-mail
            </label>
            <input
              type="email"
              name="email"
              placeholder="eg: johndoe@gmail.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label>
              <div className="lbl-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-2 split-col">
            <div className="pass-link">
              <button type="button" className="login-link">
                forgot password?
              </button>
            </div>
            <div className="reg-link">
              New User?
              <button
                type="button"
                className="login-link"
                onClick={() => setSignup(true)}
              >
                signup
              </button>
            </div>
          </div>
          <div className="form-btn">
            <button type="submit" className="submut-btn">
              <span>
                <FontAwesomeIcon icon={faUserCheck} />
              </span>
              <span>login</span>
            </button>
          </div>
        </form>
        <div className="form-content">
          <h2 className="form-subtitle">
            <span className="normal-txt">Welcome to,</span>
            <span className="color-txt">Student Management System</span>
          </h2>
          <p className="para">
            A <strong>MERN</strong> stack student management web apllication,
            easy to customize and use its and open source app in my github:
            <strong> @vinoth082003 </strong>
            E-mail : <strong> @vinothg0618 </strong>
          </p>
          <div className="image">
            <img src="/images/sms-img.png" alt="sms" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
