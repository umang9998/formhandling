import React, { useState } from "react";

const Dynamicform = () => {
  const [formData, setFormData] = useState({
    mainQuestion: "",   
    subQuestion: "",    
  });

  const [errors, setErrors] = useState({}); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!formData.mainQuestion) {
      validationErrors.mainQuestion = "Main question is required.";
    }

    if (formData.mainQuestion === "Yes" && !formData.subQuestion) {
      validationErrors.subQuestion = "This field is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log(formData); 
    }
  };

  return (
    <div>
      <h1>Dynamic Form with Conditional Fields</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Main Question: Do you want to provide more information?</label>
          <div>
            <input
              type="radio"
              name="mainQuestion"
              value="Yes"
              checked={formData.mainQuestion === "Yes"}
              onChange={handleInputChange}
            />
            Yes
            <input
              type="radio"
              name="mainQuestion"
              value="No"
              checked={formData.mainQuestion === "No"}
              onChange={handleInputChange}
            />
            No
          </div>
          {errors.mainQuestion && (
            <p style={{ color: "red" }}>{errors.mainQuestion}</p>
          )}
        </div>

        {formData.mainQuestion === "Yes" && (
          <div>
            <label>If Yes, please describe:</label>
            <textarea
              name="subQuestion"
              value={formData.subQuestion}
              onChange={handleInputChange}
              placeholder="Provide more details..."
            />
            {errors.subQuestion && (
              <p style={{ color: "red" }}>{errors.subQuestion}</p>
            )}
          </div>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Dynamicform;
