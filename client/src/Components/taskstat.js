import React, { useState, useEffect } from "react";
import axios from "axios";
import "./taskstat.css"

const TaskDisplay = () => {
  const [employeeInfo, setEmployeeInfo] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [tasks, setTasks] = useState([]);
  // const tableHeaderStyle = {
  //   background: '#f2f2f2',
  //   padding: '8px',
  //   textAlign: 'left',
  //   border: '1px solid #dd className="table-cell"
  // };

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
    <div className="task-container">
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="input-container">
        <div className="heading">Task Status</div>
        <div className="input-field">
          <label>Select Employee:</label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Select Employee</option>
            {Object.keys(employeeInfo).map((employeeId) => (
              <option key={employeeId} value={employeeId}>
                {`${employeeId} - ${employeeInfo[employeeId]}`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedEmployee && tasks.length > 0 && (
        <div className="employee-status">
          <h3>Tasks for Employee {selectedEmployee}</h3>
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead>
              <tr>
                <th className="table-header">Company Name</th>
                <th className="table-header">Consultant</th>
                <th className="table-header">GIDC</th>
                <th className="table-header">Type</th>
                <th className="table-header">Employ</th>
                <th className="table-header">HP</th>
                <th className="table-header">Status</th>
                <th className="table-header">PRI. VISIT</th>
                <th className="table-header">Quotation</th>
                <th className="table-header">Visit</th>
                <th className="table-header">Drawing</th>
                <th className="table-header">Documents</th>
                <th className="table-header">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td className="table-cell">{task.companyName}</td>
                  <td className="table-cell">{task.consultant}</td>
                  <td className="table-cell">{task.gidc}</td>
                  <td className="table-cell">{task.type}</td>
                  <td className="table-cell">{task.employ}</td>
                  <td className="table-cell">{task.hp}</td>
                  <td className="table-cell">{task.status}</td>
                  <td className="table-cell">{task.priVisit}</td>
                  <td className="table-cell">{task.quotation}</td>
                  <td className="table-cell">{task.visit}</td>
                  <td className="table-cell">{task.drawing}</td>
                  <td className="table-cell">{task.documentsToBeUpload}</td>
                  <td className="table-cell">{task.status}</td>
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

export default TaskDisplay;


