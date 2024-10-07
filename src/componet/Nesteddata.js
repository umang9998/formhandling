import React, { useState } from "react";

const Nesteddata = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    addresses: [
      { street: "", city: "", state: "", zipCode: "" } 
    ]
  });

  const [errors, setErrors] = useState({}); 

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      setFormData((prevData) => ({ ...prevData, [name]: value })); 
    } else {
      const updatedAddresses = [...formData.addresses];
      updatedAddresses[index][name] = value;
      setFormData((prevData) => ({ ...prevData, addresses: updatedAddresses }));
    }
  };

  const handleAddAddress = () => {
    setFormData((prevData) => ({
      ...prevData,
      addresses: [...prevData.addresses, { street: "", city: "", state: "", zipCode: "" }]
    }));
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = formData.addresses.filter((_, i) => i !== index);
    setFormData((prevData) => ({ ...prevData, addresses: updatedAddresses }));
  };

  const validateForm = () => {
    const validationErrors = {};
    
    if (!formData.name) validationErrors.name = "Name is required.";
    
    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email) {
      validationErrors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (formData.addresses.length === 0) {
      validationErrors.addresses = "At least one address is required.";
    } else {
      formData.addresses.forEach((address, index) => {
        if (!address.street || !address.city || !address.state || !address.zipCode) {
          validationErrors[`address_${index}`] = `Address ${index + 1} is incomplete.`;
        }
      });
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
      <h1>Complex Form with Nested Addresses</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>

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
        </div>

        <div>
          <label>Addresses:</label>
          {formData.addresses.map((address, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <input
                type="text"
                name="street"
                placeholder="Street"
                value={address.street}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              <input
                type="number"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) => handleInputChange(e, index)}
                required
              />
              {errors[`address_${index}`] && (
                <p style={{ color: "red" }}>{errors[`address_${index}`]}</p>
              )}

              <button
                type="button"
                onClick={() => handleRemoveAddress(index)}
                disabled={formData.addresses.length === 1} 
              >
                Remove Address
              </button>
            </div>
          ))}

          <button type="button" onClick={handleAddAddress}>
            Add Another Address
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Nesteddata;
