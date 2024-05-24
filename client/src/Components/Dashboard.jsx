import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "../css/dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Admin from "./Admin";
import Profile from "./Profile";

const Dashboard = ({ userId }) => {
  const context = useContext(AppContext);
  const [isProfile, setProfile] = useState(false); // Change to false initially
  const [User, setUser] = useState(null);

  const getUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/dashboard/${userId}`,
        {
          withCredentials: true, // Ensure cookies are sent
        }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserDetails();
    }
  }, [userId]);

  if (!User) {
    return <div>Loading...</div>;
  }

  const role = User.role; // Use the role from the user data

  return (
    <>
      <div className="dashboard">
        <nav className="dashboard-nav">
          <div className="inner-nav">
            <div className="nav-profile">
              <div className="logo">
                <img src="/images/sms-logo.jpg" alt="sms-logo" />
              </div>
              <h3>Student management system</h3>
            </div>
            <ul className="nav-options">
              <li className="nav-menu menu-li" onClick={() => setProfile(true)}>
                <div className="inner-menu">
                  <div className="submenu-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <p className="menu-text">Profile</p>
                </div>
              </li>
              <li className="nav-menu menu-li">
                <div className="inner-menu">
                  <div className="submenu-icon">
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </div>
                  <p className="menu-text">Logout</p>
                </div>
              </li>
              <li className="nav-menu w-sub-menu">
                <div className="inner-menu">
                  <div className="user-details">
                    <div>
                      <h4 className="user-name">{User.name}</h4>
                      <p className="role">{User.role}</p>
                    </div>
                  </div>
                  <div className="user-prof">
                    <img src={User.imagePath} alt="user-profile" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
        <main className="dashboard-main">
          <header className="header">
            <h4>Page: {User.role} page</h4>
            <div className="page-route">
              <p>{User.role}/</p>
              <p>home</p>
            </div>
          </header>
          {role === "admin" && <Admin />}
        </main>
      </div>
      {isProfile && <Profile user={User} />}
    </>
  );
};

export default Dashboard;
