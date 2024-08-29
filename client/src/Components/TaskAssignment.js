import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskAssignment.css";

const TaskAssignment = () => {
  const [employees, setEmployees] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [mainTask, setMainTask] = useState("");
  const [subtasks, setSubtasks] = useState([
    { name: "", formData: {}, deadline: "" },
  ]);

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

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { name: "", formData: {}, deadline: "" }]);
  };

  const handleSubtaskChange = (index, field, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index][field] = value;
    setSubtasks(newSubtasks);
  };

  const handleTaskAssignment = (event) => {
    event.preventDefault();

    // Submit the task assignment to the backend
    axios
      .post("http://localhost:5000/tasks/assign", {
        companyName,
        assignedTo,
        mainTask,
        subtasks,
      })
      .then((response) => {
        console.log("Task assigned successfully:", response.data);
        alert("Task Assigned Successfully");
        setCompanyName("");
        setAssignedTo("");
        setMainTask("");
        setSubtasks([{ name: "", formData: {}, deadline: "" }]);
      })
      .catch((error) => {
        console.error("Error assigning task:", error);
      });
  };

  return (
    <div className="app">
      <div className="main--container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="container">
          <h2 className="title">Assign Task</h2>
          <form onSubmit={handleTaskAssignment}>
            <div className="form-group">
              <label htmlFor="companyName" className="label">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter Company Name"
                className="input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="assignTo" className="label">
                Assign To
              </label>
              <select
                id="assignTo"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {`${employee.employeeId} - ${employee.name}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="mainTask" className="label">
                Main Task
              </label>
              <select
                id="mainTask"
                value={mainTask}
                onChange={(e) => setMainTask(e.target.value)}
                className="input"
                required
              >
                <option value="">Select Main Task</option>
                <option value="Documents">Documents</option>
                <option value="Drawing">Drawing</option>
                <option value="License">License</option>
                <option value="Site Visit">Site Visit</option>
                <option value="Stability">Stability</option>
              </select>
            </div>
            {subtasks.map((subtask, index) => (
              <div key={index} className="form-group">
                <label className="label">Subtask {index + 1}</label>
                <input
                  type="text"
                  value={subtask.name}
                  onChange={(e) =>
                    handleSubtaskChange(index, "name", e.target.value)
                  }
                  placeholder="Enter Subtask Name"
                  className="input"
                  required
                />
                <input
                  type="date"
                  value={subtask.deadline}
                  onChange={(e) =>
                    handleSubtaskChange(index, "deadline", e.target.value)
                  }
                  className="input"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSubtask}
              className="button"
            >
              Add Another Subtask
            </button>
            <button type="submit" className="button">
              Assign Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskAssignment;
