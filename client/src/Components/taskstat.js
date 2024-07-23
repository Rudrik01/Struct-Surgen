import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [tasks, setTasks] = useState([]);
  const tableHeaderStyle = {
    background: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  const tableCellStyle = {
    padding: '8px',
    textAlign: 'left',
    border: '1px solid #ddd',
  };

  // Fetch employee IDs and names when the component mounts
  useEffect(() => {
    const fetchEmployeeInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
        const employeeData = response.data.reduce((acc, user) => {
          acc[user.employeeId] = user.name;
          return acc;
        }, {});
        setEmployeeInfo(employeeData);
      } catch (error) {
        console.error("Error fetching employee info:", error);
      }
    };

    fetchEmployeeInfo();
  }, []);

  // Fetch tasks and corresponding user data when the selected employeeId changes
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (selectedEmployee) {
          const response = await axios.get(
            `http://localhost:5000/tasks/checkStatusAndDocuments/${selectedEmployee}`
          );
          setTasks(response.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [selectedEmployee]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <label>Select Employee:</label>
      <select
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}>
        <option value="">Select Employee</option>
        {Object.keys(employeeInfo).map((employeeId) => (
          <option key={employeeId} value={employeeId}>
            {`${employeeId} - ${employeeInfo[employeeId]}`}
          </option>
        ))}
      </select>

      {selectedEmployee && tasks.length > 0 && (
        <div>
          <h3>Tasks for Employee {selectedEmployee}</h3>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Company Name</th>
                <th style={tableHeaderStyle}>Consultant</th>
                <th style={tableHeaderStyle}>GIDC</th>
                <th style={tableHeaderStyle}>Type</th>
                <th style={tableHeaderStyle}>Employ</th>
                <th style={tableHeaderStyle}>HP</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>PRI. VISIT</th>
                <th style={tableHeaderStyle}>Quotation</th>
                <th style={tableHeaderStyle}>Visit</th>
                <th style={tableHeaderStyle}>Drawing</th>
                <th style={tableHeaderStyle}>Documents</th>
                <th style={tableHeaderStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td style={tableCellStyle}>{task.companyName}</td>
                  <td style={tableCellStyle}>{task.consultant}</td>
                  <td style={tableCellStyle}>{task.gidc}</td>
                  <td style={tableCellStyle}>{task.type}</td>
                  <td style={tableCellStyle}>{task.employ}</td>
                  <td style={tableCellStyle}>{task.hp}</td>
                  <td style={tableCellStyle}>{task.status}</td>
                  <td style={tableCellStyle}>{task.priVisit}</td>
                  <td style={tableCellStyle}>{task.quotation}</td>
                  <td style={tableCellStyle}>{task.visit}</td>
                  <td style={tableCellStyle}>{task.drawing}</td>
                  <td style={tableCellStyle}>{task.documentsToBeUpload}</td>
                  <td style={tableCellStyle}>{task.status}</td>
                  {/* Add more columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
