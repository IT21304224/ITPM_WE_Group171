import React, { useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import backgroundImage from "../images/9.jpg";




const Exchange = () => {
  const [exchangeData, setExchangeData] = useState({
    exchangecode: "",
    productcode: "",
    exchangename: "",
    quantity: 0,
    solddate: new Date().toISOString().split("T")[0],
    addeddate: new Date().toISOString().split("T")[0],
    email: "",
    name: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExchangeData({ ...exchangeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("/api/v1/exchange/create", exchangeData);
        alert("Exchange product request created successfully!");
        setExchangeData({
          exchangecode: "",
          productcode: "",
          exchangename: "",
          quantity: 0,
          solddate: new Date().toISOString().split("T")[0],
          addeddate: new Date().toISOString().split("T")[0],
          email: "",
          name: "",
          price: 0,
          reason: "", 
        });
        setFormErrors({});
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to create exchange product request.");
      }
    }
  };




  const validateForm = () => {
    const errors = {};
    if (!exchangeData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!exchangeData.reason.trim()) {
      errors.reason = "Reason is required";
    }
    if (!exchangeData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(exchangeData.email)) {
      errors.email = "Invalid email format";
    }
    if (!exchangeData.exchangecode.trim()) {
      errors.exchangecode = "Exchange code is required";
    }
    if (!exchangeData.productcode.trim()) {
      errors.productcode = "Product code is required";
    }
    if (!exchangeData.exchangename.trim()) {
      errors.exchangename = "Exchange name is required";
    }
    if (exchangeData.quantity <= 0) {
      errors.quantity = "Quantity must be greater than 0";
    }
    if (exchangeData.price <= 0) {
      errors.price = "Quantity must be greater than 0";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };





  const isValidEmail = (email) => {
    // Simple email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };



  //.....................................................................................................................................................................

  return (
    <div style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", minHeight: "100vh"}}> 
    <Layout title={"Exchange Product Request - Ecommerce App"}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Create Exchange Product Request</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
                      placeholder="Your Name"
                      name="name"
                      value={exchangeData.name}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
                      placeholder="Your Email"
                      name="email"
                      value={exchangeData.email}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.exchangecode ? "is-invalid" : ""}`}
                      placeholder="Exchange Code"
                      name="exchangecode"
                      value={exchangeData.exchangecode}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.exchangecode && <div className="invalid-feedback">{formErrors.exchangecode}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.productcode ? "is-invalid" : ""}`}
                      placeholder="Product Code"
                      name="productcode"
                      value={exchangeData.productcode}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.productcode && <div className="invalid-feedback">{formErrors.productcode}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className={`form-control ${formErrors.exchangename ? "is-invalid" : ""}`}
                      placeholder="Exchange Name"
                      name="exchangename"
                      value={exchangeData.exchangename}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.exchangename && <div className="invalid-feedback">{formErrors.exchangename}</div>}
                  </div>
                  <div className="mb-3">
                  <input
                      type="textfeild"
                      className={`form-control ${formErrors.reason ? "is-invalid" : ""}`}
                      placeholder="Reason"
                      name="reason"
                      value={exchangeData.reason}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.reason && <div className="invalid-feedback">{formErrors.reason}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className={`form-control ${formErrors.price ? "is-invalid" : ""}`}
                      placeholder="Price"
                      name="price"
                      value={exchangeData.price}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.price && <div className="invalid-feedback">{formErrors.price}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="number"
                      className={`form-control ${formErrors.quantity ? "is-invalid" : ""}`}
                      placeholder="Quantity"
                      name="quantity"
                      value={exchangeData.quantity}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.quantity && <div className="invalid-feedback">{formErrors.quantity}</div>}
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      name="solddate"
                      value={exchangeData.solddate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="date"
                      className="form-control"
                      name="addeddate"
                      value={exchangeData.addeddate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary" onClick={validateForm}>Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </div>
  );
};

export default Exchange;
