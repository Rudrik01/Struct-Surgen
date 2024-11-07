import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const DrawingUploadForm = ({ employeeId }) => {
  const [drawingFile, setDrawingFile] = useState(null); // Drawing sheet photo
  const location = useLocation();
  const { companyName, srNo, taskId } = location.state || {};

  const handleFileChange = (e) => {
    setDrawingFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data to submit
    const formData = new FormData();

    // Append data to FormData
    formData.append("srNo", srNo);
    formData.append("companyName", companyName);
    formData.append("drawingFile", drawingFile);
    formData.append("completed", true); // Append completed status directly

    // Log formData for debugging
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
   

    try {
      // Make the API call to upload the drawing photo
      const response = await axios.post(
        `http://localhost:5000/api/employee/upload-drawing/${taskId}`,
        formData, // Send formData directly
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Drawing sheet uploaded successfully!");
    } catch (error) {
      console.error("Error uploading drawing sheet:", error);
    }
  };

  return (
    <div className="drawing-upload-form">
      <h2>Upload Drawing Sheet</h2>
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
            <label>Upload Drawing Sheet:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
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
        .drawing-upload-form {
          max-width: 500px;
          margin: 50px auto;
          padding: 20px;
          background-color: #f0f0f5;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          font-family: "Poppins", sans-serif;
        }
        .drawing-upload-form h2 {
          text-align: center;
          color: #444;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }
        .form-group input[type="text"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .form-group input[type="file"] {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          background-color: #fff;
        }
        .submit-btn {
          width: 100%;
          padding: 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default DrawingUploadForm;
