import React, { useState } from "react";

const Step1 = ({ formData, handleInputChange }) => (
  <div>
    <h2>Step 1: Personal Details</h2>
    <input
      type="text"
      name="firstName"
      placeholder="First Name"
      value={formData.firstName}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="lastName"
      placeholder="Last Name"
      value={formData.lastName}
      onChange={handleInputChange}
      required
    />
  </div>
);

const Step2 = ({ formData, handleInputChange }) => (
  <div>
    <h2>Step 2: Address Details</h2>
    <input
      type="text"
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="city"
      placeholder="City"
      value={formData.city}
      onChange={handleInputChange}
      required
    />
    <input
      type="number"
      name="zipCode"
      placeholder="Zip Code"
      value={formData.zipCode}
      onChange={handleInputChange}
      required
    />
  </div>
);

const Step3 = ({ formData, handleInputChange }) => (
  <div>
    <h2>Step 3: Payment Details</h2>
    <input
      type="text"
      name="cardNumber"
      placeholder="Card Number"
      value={formData.cardNumber}
      onChange={handleInputChange}
      required
    />
    <input
      type="text"
      name="expiryDate"
      placeholder="Expiry Date (MM/YY)"
      value={formData.expiryDate}
      onChange={handleInputChange}
      required
    />
    <input
      type="number"
      name="cvv"
      placeholder="CVV"
      value={formData.cvv}
      onChange={handleInputChange}
      required
    />
  </div>
);

const Multistepform = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateStep = () => {
    if (currentStep === 1 && (!formData.firstName || !formData.lastName)) {
      alert("Please enter both First Name and Last Name.");
      return false;
    } else if (
      currentStep === 2 &&
      (!formData.address || !formData.city || !formData.zipCode)
    ) {
      alert("Please complete Address, City, and Zip Code.");
      return false;
    } else if (
      currentStep === 3 &&
      (!formData.cardNumber || !formData.expiryDate || !formData.cvv)
    ) {
      alert("Please enter valid payment information.");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      alert("Form submitted successfully!");
      console.log(formData);
    }
  };

  return (
    <div>
      <h1>Multi-Step Form</h1>
      <div>
        <p>Step {currentStep} of 3</p>
        <progress value={currentStep} max="3" />
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Step1 formData={formData} handleInputChange={handleInputChange} />
        )}
        {currentStep === 2 && (
          <Step2 formData={formData} handleInputChange={handleInputChange} />
        )}
        {currentStep === 3 && (
          <Step3 formData={formData} handleInputChange={handleInputChange} />
        )}

        <div>
          {currentStep > 1 && <button onClick={handlePrevStep}>Previous</button>}
          {currentStep < 3 && <button onClick={handleNextStep}>Next</button>}
          {currentStep === 3 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default Multistepform;
