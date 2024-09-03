import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./TaskTypePage.css";

const TaskTypePage = () => {
  const { taskType } = useParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const employeeId = localStorage.getItem("employeeId");
        const response = await axios.get(
          `http://localhost:5000/api/employee/tasks/${employeeId}/${taskType}/companies`
        );
        setCompanies(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [taskType]);

  const handleCompanyClick = (taskId) => {
    navigate(`/employee/task/${taskId}/form`);
  };

  return (
    <div className="task-type-container">
      <div className="header">
        <h1>{taskType} Management</h1>
        <p>
          Choose a company from the list below to manage specific tasks related
          to {taskType}.
        </p>
      </div>
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading companies...</p>
        </div>
      ) : (
        <div className="content-container">
          {companies.length > 0 ? (
            companies.map((company) => (
              <div
                key={company._id}
                className="company-card"
                onClick={() => handleCompanyClick(company._id)}
              >
                <h3>{company.companyName}</h3>
              </div>
            ))
          ) : (
            <p>No companies available for this task type.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskTypePage;
