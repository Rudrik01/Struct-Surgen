import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskAssignment = () => {
  const [employees, setEmployees] = useState([]);
  const [companyName, setTitle] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    // Fetch list of employees to populate the dropdown
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const handleTaskAssignment = () => {
    // Find the selected employee object based on the assignedTo value
    const selectedEmployee = employees.find(
      (employee) => employee._id === assignedTo
    );

    if (!selectedEmployee) {
      console.error("Invalid employee ID");
      return;
    }

    // Submit the task assignment to the backend
    axios
      .post("http://localhost:5000/api/task/assign", {
        companyName,
        assignedTo: selectedEmployee.employeeId, // Use employeeId here instead of _id
      })
      .then((response) => {
        console.log("Task assigned successfully:", response.data);
        // You can reset the form or perform other actions after successful assignment
      })
      .catch((error) => {
        console.error("Error assigning task:", error);
      });
  };
  return (
    <div>
      <h2>Assign Task</h2>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Assign To:</label>
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="">Select Employee</option>
          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
              {`${employee.employeeId} - ${employee.name}`}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleTaskAssignment}>Assign Task</button>
    </div>
  );
};

export default TaskAssignment;
