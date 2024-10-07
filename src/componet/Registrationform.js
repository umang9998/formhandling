import React, { useState } from 'react';

const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    setErrors({ ...errors, [name]: validate[name](value, values) });
  };

  const handleSubmit = (e, callback) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(values).forEach((key) => {
      const error = validate[key](values[key], values);
      if (error) validationErrors[key] = error;
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      callback(); 
    }
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
};

const validateForm = {
  name: (value) => {
    if (!value) return "Name is required";
    return "";
  },
  email: (value) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!value) return "Email is required";
    if (!emailRegex.test(value)) return "Invalid email format";
    return "";
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters long";
    return "";
  },
  confirmPassword: (value, values) => {
    if (!value) return "Confirm Password is required";
    if (value !== values.password) return "Passwords do not match";
    return "";
  },
};

const Registrationform = () => {
  const initialFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm(
    initialFormValues,
    validateForm
  );

  const submitForm = () => {
    alert("Form submitted successfully!");
    console.log(values); 
  };

  return (
    <div>
      <h1>Registration Form</h1>
      <form onSubmit={(e) => handleSubmit(e, submitForm)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registrationform;
