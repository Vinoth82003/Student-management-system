import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import "../css/auth.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Auth = () => {
  const [signup, setSignup] = useState(false);
  const [isPopup, setPopup] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const Popup = () => {
    return (
      <div className={`popup ${popupData.status}`}>
        <button
          type="button"
          className="close-popup"
          onClick={() => setPopup(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="inner-popup">
          <h1 className="status">{popupData.status}</h1>
          <p className="message">{popupData.message}</p>
        </div>
        <div className="progressBar">
          <div className="inner-track">
            <div className="thumb"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="authPage">
        {isPopup && <Popup />}
        <div className="left-cover cover">
          <div className="cover-form signup-form">
            {signup ? (
              <SignUp
                setSignup={setSignup}
                setPopup={setPopup}
                setPopupData={setPopupData}
              />
            ) : (
              <Login
                setSignup={setSignup}
                setPopup={setPopup}
                setPopupData={setPopupData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
