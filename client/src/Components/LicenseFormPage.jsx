import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const LicenseFormPage = () => {
  const [licenseApproved, setLicenseApproved] = useState(null); // Yes or No
  const location = useLocation();
  const { companyName, srNo, taskId } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit form data to backend
    try {
      const formData = {
        srNo,
        companyName,
        licenseApproved,
      };
      const payload = {
        formData,
        completed: true,
      };
      console.log(formData);
      await axios.put(
        `http://localhost:5000/api/employee/ta/${taskId}`,
        payload
      );
      alert("License approval form submitted successfully!");
    } catch (error) {
      console.error("Error submitting license approval form:", error);
    }
  };

  return (
    <div className="license-form">
      <h2>License Approval Form</h2>
      {companyName ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Serial Number:</label>
            <input type="text" value={srNo} readOnly />
          </div>
          <div className="form-group">
            <label>Company Name:</label>
            <input type="text" value={companyName} readOnly />
          </div>
          <div className="form-group">
            <label>License Approved:</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Yes"
                  checked={licenseApproved === "Yes"}
                  onChange={() => setLicenseApproved("Yes")}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="No"
                  checked={licenseApproved === "No"}
                  onChange={() => setLicenseApproved("No")}
                />
                No
              </label>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      ) : (
        <p>Loading company data...</p>
      )}

      {/* CSS Styling */}
      <style jsx>{`
        .license-form {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f4f4f9;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .license-form h2 {
          text-align: center;
          color: #333;
        }
        .form-group {
          margin-bottom: 15px;
        }
        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        .form-group input[type="text"] {
          width: 100%;
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .radio-group {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
        }
        .radio-group label {
          display: flex;
          align-items: center;
        }
        .radio-group input[type="radio"] {
          margin-right: 5px;
        }
        .submit-btn {
          width: 100%;
          padding: 10px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        .submit-btn:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default LicenseFormPage;
