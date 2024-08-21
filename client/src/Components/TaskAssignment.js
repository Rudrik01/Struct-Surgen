// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TaskAssignment = () => {
//   const [employees, setEmployees] = useState([]);
//   const [companyName, setTitle] = useState("");
//   const [assignedTo, setAssignedTo] = useState("");

//   useEffect(() => {
//     // Fetch list of employees to populate the dropdown
//     axios
//       .get("http://localhost:5000/api/users")
//       .then((response) => {
//         setEmployees(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//       });
//   }, []);

//   const handleTaskAssignment = () => {
//     // Find the selected employee object based on the assignedTo value
//     const selectedEmployee = employees.find(
//       (employee) => employee._id === assignedTo
//     );

//     if (!selectedEmployee) {
//       console.error("Invalid employee ID");
//       return;
//     }

//     // Submit the task assignment to the backend
//     axios
//       .post("http://localhost:5000/api/task/assign", {
//         companyName,
//         assignedTo: selectedEmployee.employeeId, // Use employeeId here instead of _id
//       })
//       .then((response) => {
//         console.log("Task assigned successfully:", response.data);
//         // You can reset the form or perform other actions after successful assignment
//       })
//       .catch((error) => {
//         console.error("Error assigning task:", error);
//       });
//   };
//   return (
//     <div>
//       <h2>Assign Task</h2>
//       <div>
//         <label>Company Name:</label>
//         <input
//           type="text"
//           value={companyName}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Assign To:</label>
//         <select
//           value={assignedTo}
//           onChange={(e) => setAssignedTo(e.target.value)}>
//           <option value="">Select Employee</option>
//           {employees.map((employee) => (
//             <option key={employee._id} value={employee._id}>
//               {`${employee.employeeId} - ${employee.name}`}
//             </option>
//           ))}
//         </select>
//       </div>
//       <button onClick={handleTaskAssignment}>Assign Task</button>
//     </div>
//   );
// };

// export default TaskAssignment;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskAssignment.css" 

const TaskAssignment = () => {
  const [employees, setEmployees] = useState([]);
  const [companyName, setCompanyName] = useState("");
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

  const handleTaskAssignment = (event) => {
    event.preventDefault();
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
        alert('Task Assigned Successfully')
        // You can reset the form or perform other actions after successful assignment
        setCompanyName("");
        setAssignedTo("");
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
            <button type="submit" className="button">
              Assign Task
            </button>
          </form>
        </div>
      </div>
      <img className="footer-icon" alt="" src="/vectors.svg" />
    </div>
  );
};

// const styles = {
//   app: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "100vh",
//     backgroundColor: "#f5f7f9",
//   },
//   container: {
//     backgroundColor: "#edf2f7",
//     padding: "2rem",
//     borderRadius: "10px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     textAlign: "center",
//   },
//   logo: {
//     maxWidth: "100px",
//     marginBottom: "1rem",
//   },
//   title: {
//     color: "#2d3748",
//     marginBottom: "1rem",
//   },
//   formGroup: {
//     marginBottom: "1rem",
//     textAlign: "left",
//   },
//   label: {
//     display: "block",
//     marginBottom: "0.5rem",
//     color: "#4a5568",
//   },
//   input: {
//     width: "100%",
//     padding: "0.5rem",
//     border: "1px solid #cbd5e0",
//     borderRadius: "5px",
//   },
//   button: {
//     backgroundColor: "#e53e3e",
//     color: "white",
//     border: "none",
//     padding: "0.5rem 1rem",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   buttonHover: {
//     backgroundColor: "#c53030",
//   },
// };

export default TaskAssignment;
