import React, { useState, useEffect } from "react";

const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    address: "",
    phone: "",
    dateOfBirth: "",
    studentId: "",
    grade: "",
    teacherId: "",
    department: "",
    bio: "",
    role: user.role,
  });

  useEffect(() => {
    // Optionally fetch and set additional personal details here if necessary
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="role">Role</label>
          <input type="text" name="role" id="role" value={user.role} readOnly />
        </div>
        {formData.role === "student" && (
          <>
            <div className="input-field">
              <label htmlFor="studentId">Student ID</label>
              <input
                type="text"
                name="studentId"
                id="studentId"
                value={formData.studentId}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="grade">Grade</label>
              <input
                type="text"
                name="grade"
                id="grade"
                value={formData.grade}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        {formData.role === "teacher" && (
          <>
            <div className="input-field">
              <label htmlFor="teacherId">Teacher ID</label>
              <input
                type="text"
                name="teacherId"
                id="teacherId"
                value={formData.teacherId}
                onChange={handleChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="department">Department</label>
              <input
                type="text"
                name="department"
                id="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
          </>
        )}
        <div className="input-field">
          <label htmlFor="bio">Bio</label>
          <textarea
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </>
  );
};

export default Profile;
