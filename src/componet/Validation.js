import React, { useState } from "react";

const Validation = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [valid, setValid] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      const emailRegex = /\S+@\S+\.\S+/;
      if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
        setValid((prev) => ({ ...prev, email: false }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
        setValid((prev) => ({ ...prev, email: true }));
      }
    }

    if (name === "password") {
      if (value.length < 8) {
        setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
        setValid((prev) => ({ ...prev, password: false }));
      } else {
        setErrors((prev) => ({ ...prev, password: "" }));
        setValid((prev) => ({ ...prev, password: true }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
        setValid((prev) => ({ ...prev, confirmPassword: false }));
      } else {
        setErrors((prev) => ({ ...prev, confirmPassword: "" }));
        setValid((prev) => ({ ...prev, confirmPassword: true }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (valid.email && valid.password && valid.confirmPassword) {
      alert("Form submitted successfully!");
      console.log(formData); 
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div>
      <h1>Real-Time Validation Form</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
          {valid.email && <span style={{ color: "green" }}>✔️</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
          {valid.password && <span style={{ color: "green" }}>✔️</span>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword}</p>}
          {valid.confirmPassword && <span style={{ color: "green" }}>✔️</span>}
        </div>

        <button type="submit" disabled={!valid.email || !valid.password || !valid.confirmPassword}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Validation;
