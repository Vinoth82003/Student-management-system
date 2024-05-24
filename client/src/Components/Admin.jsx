import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faChalkboardTeacher,
  faGraduationCap,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import "../css/admin.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Admin = () => {
  const genderChartRef = useRef(null);
  const roleChartRef = useRef(null);

  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [20, 60],
        backgroundColor: ["rgba(75,192,192,0.4)", "rgba(255,99,132,0.4)"],
        borderColor: ["rgba(75,192,192,1)", "rgba(255,99,132,1)"],
        borderWidth: 1,
      },
    ],
  };

  const roleData = {
    labels: ["Teachers", "Students"],
    datasets: [
      {
        label: "Role Distribution",
        data: [60, 300],
        backgroundColor: ["rgba(153,102,255,0.4)", "rgba(255,159,64,0.4)"],
        borderColor: ["rgba(153,102,255,1)", "rgba(255,159,64,1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    if (genderChartRef.current) {
      const genderChartInstance = genderChartRef.current;
      genderChartInstance.options.plugins.title = {
        display: true,
        text: "Updated Gender Distribution",
      };
      genderChartInstance.update();
    }

    if (roleChartRef.current) {
      const roleChartInstance = roleChartRef.current;
      roleChartInstance.options.plugins.title = {
        display: true,
        text: "Updated Role Distribution",
      };
      roleChartInstance.update();
    }
  }, []);

  return (
    <>
      <section className="admin-page">
        <div className="side-menu">
          <ul className="top-options">
            <li className="top-list">
              <div className="inner-list">
                <div className="top-icon">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <p className="text">students</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </li>
            <li className="top-list">
              <div className="inner-list">
                <div className="top-icon">
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                </div>
                <p className="text">teachers</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </li>
            <li className="top-list">
              <div className="inner-list">
                <div className="top-icon">
                  <FontAwesomeIcon icon={faList} />
                </div>
                <p className="text">task</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            </li>
          </ul>
        </div>
        <div className="display-box">
          <div className="chart-container">
            <div className="chart">
              <h5>Chart for male and female count</h5>
              <Pie ref={genderChartRef} data={genderData} />
            </div>
            <div className="chart">
              <h5>Chart for teachers and student count</h5>
              <Pie ref={roleChartRef} data={roleData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admin;
