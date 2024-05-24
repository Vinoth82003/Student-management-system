import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faUserCircle,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faUserCog } from "@fortawesome/free-solid-svg-icons/faUserCog";

const SignUp = ({ setSignup, setPopup, setPopupData }) => {
  const images = [
    "/user-images/male-1.jpg",
    "/user-images/male-2.jpg",
    "/user-images/male-3.png",
    "/user-images/female-1.jpg",
    "/user-images/female-2.jpg",
    "/user-images/female-3.jpg",
  ];

  const [currentImage, setIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const handlePopup = () => {
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 6000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      email: formData.email,
      role: document.querySelector('input[type="radio"]:checked').value,
      password: formData.password,
      image: currentImage !== null ? images[currentImage] : "default",
    };
    console.log(data);
    try {
      await axios.post("http://localhost:5000/api/users/signup", data);
      setPopupData({
        status: "success",
        message: "Registered successfully..!  now try to login ",
      });
      setSignup(false);
      handlePopup();
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
      <div className="form-container login-container">
        <div className="form-content">
          <h2 className="form-subtitle">
            <span className="normal-txt">Welcome to,</span>
            <span className="color-txt">Student Management System</span>
          </h2>
          <p className="para">
            A <strong>MERN</strong> stack student management web application,
            easy to customize and use. It's an open-source app on my GitHub:
            <strong> @vinoth082003 </strong>
            E-mail: <strong> @vinothg0618 </strong>
          </p>
          <div className="image">
            <img src="/images/sms-img.png" alt="sms" />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="form-signup">
          <h1 className="color-txt">Sign Up</h1>
          <div className="input-field">
            <label>
              <div className="lbl-icon">
                <FontAwesomeIcon icon={faUser} />
              </div>
              User Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g., John Doe"
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="e.g., johndoe@gmail.com"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label>
              <div className="lbl-icon">
                <FontAwesomeIcon icon={faLock} />
              </div>
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label>
              <div className="lbl-icon">
                <FontAwesomeIcon icon={faUserCog} />
              </div>
              Role
            </label>
            <div className="radio-group">
              <label>
                <input type="radio" name="role" id="role" value={"student"} />
                student
              </label>
              <label>
                <input type="radio" name="role" id="role" value={"teacher"} />
                teacher
              </label>
              <label>
                <input type="radio" name="role" id="role" value={"admin"} />
                admin
              </label>
            </div>
          </div>
          <div className="input-field">
            <div className="choose-profile">
              <div className="show-profile">
                <div className="default-user">
                  {currentImage !== null ? (
                    <img src={images[currentImage]} alt="avatar-1" />
                  ) : (
                    <FontAwesomeIcon icon={faUserCircle} />
                  )}
                </div>
                <button
                  className="change-profile btn-formBtn"
                  type="button"
                  onClick={() => setIndex(null)}
                >
                  <FontAwesomeIcon icon={faUserEdit} />
                </button>
              </div>
              <ul className="display-avatar">
                {images.map((img, index) => (
                  <li
                    key={index}
                    className="avatar"
                    onClick={() => setIndex(index)}
                  >
                    <img src={img} alt={`avatar-${index + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-2">
            Already have an account?
            <button
              type="button"
              className="login-link"
              onClick={() => setSignup(false)}
            >
              Login
            </button>
          </div>
          <div className="form-btn">
            <button type="submit" className="submut-btn">
              <span>
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              <span>sign up</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
