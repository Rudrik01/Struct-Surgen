// EmployeeForm.js
import React, { useState } from "react";
import axios from "axios";
import "./CreateEmployee.css";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
} from "@mui/material";

const EmployeeForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const handleCreateEmployee = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/createEmployee",
        {
          email,
          name,
          role,
        }
      );

      if (response.status === 400) {
        alert(response.data.message);
      } else {
        alert("Employee created successfully!");
        // Redirect to the desired page or clear the form, etc.
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Error creating employee. Please try again.");
    }
  };

  return (
    <div className="-container">
      <div className="main-container">
        <img src="/logo.png" alt="Logo" className="logo" />
        <div className="employee-form">
          <h2 className="title">Create Employee</h2>
          <div className="form-group">
            <label className="label">Email:</label>
            <input
             style={{ color: 'black' }}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
              placeholder="Enter Email"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label className="label">Name:</label>
            <input
               style={{ color: 'black' }}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
              placeholder="Enter Name"
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <FormControl fullWidth required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                label="Role"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="admin"  style={{ color: 'black' }}>Admin</MenuItem>
                <MenuItem value="employee"  style={{ color: 'black' }}> Employee</MenuItem>
              </Select>
              <FormHelperText>Choose the role for the employee</FormHelperText>
            </FormControl>
          </div>
          <button onClick={handleCreateEmployee} className="button">
            Create Employee
          </button>
        </div>
      </div>
      <img className="footer-icon" alt="" src="/vectors.svg" />
    </div>
  );
};

export default EmployeeForm;

// import {
//   Select,
//   InputLabel,
//   MenuItem,
//   FormControl,
//   FormHelperText,
// } from "@mui/material";
// import React, { useState } from 'react';
// import axios from 'axios';
// import "../assets/CreateEmployee.css";

// const EmployeeForm = () => {
//   const [email, setEmail] = useState("");
//   const [name, setName] = useState("");
//   const [role, setRole] = useState("");

//   const handleCreateEmployee = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/auth/createEmployee",
//         {
//           email,
//           name,
//           role,
//         }
//       );

//       console.log(response.data);

//       if (response.status === 400) {
//         alert(response.data.message);
//       } else {
//         alert("Employee created successfully!");
//       }
//     } catch (error) {
//       console.error("Error creating employee:", error);
//       alert("Error creating employee. Please try again.");
//     }
//   };

//   return (
//     <div className="-container">
//       <div className="main-container">
//         <img src="/logo.png" alt="Logo" className="logo" />
//         <div className="employee-form">
//           <h2 className="title">Create Employee</h2>
//           <div className="form-group">
//             <label className="label">Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="input"
//               autoComplete="off"
//               placeholder="Enter Email"
//             />
//           </div>
//           <div className="form-group">
//             <label className="label">Name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//               className="input"
//               autoComplete="off"
//               placeholder="Enter Name"
//             />
//           </div>
//           <div className="form-group">
//             <label className="label">Role:</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               required
//               className="input"
//             >
//               <option value="">Select Role</option>
//               <option value="admin">Admin</option>
//               <option value="employee">Employee</option>
//             </select>
//           </div>
//           <button onClick={handleCreateEmployee} className="button">
//             Create Employee
//           </button>
//         </div>
//       </div>
//       <img className="footer-icon" alt="" src="/vectors.svg" />
//     </div>
//   );
// };

// export default EmployeeForm;

// const EmployeeForm = () => {
//   const [email, setEmail] = useState('');
//   const [name, setName] = useState('');
//   const [role, setRole] = useState('');

//   const handleCreateEmployee = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/auth/createEmployee', {
//         email,
//         name,
//         role,
//       });

//       console.log(response.data);

//       if (response.status === 400) {
//         alert(response.data.message);
//       } else {
//         alert('Employee created successfully!');
//         // Redirect to the desired page or clear the form, etc.
//       }
//     } catch (error) {
//       console.error('Error creating employee:', error);
//       alert('Error creating employee. Please try again.');
//     }
//   };

//   return (
//     <div className="create-employee">
//       <section className="main-container">
//         <img className="whatsapp-image-2024-03-05-at-3-icon" loading="lazy" alt="" src="/logo.png"/>
//         <div className="content-area">
//           <div className="rectangle-parent">
//             <div className="frame-child" />
//             <div className="button-primary">
//               <div className="create-employee1">Create Employee</div>
//             </div>
//             <div className="field-labels">
//               <div className="email">Email</div>
//               <input
//                 className="input-fields"
//                 placeholder="Enter Email"
//                 type="text"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="field-labels">
//               <div className="email">Name</div>
//               <input
//                 className="input-fields"
//                 placeholder="Enter Name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 required
//               />
//             </div>
//             <div className="field-labels2">
//               <div className="role">Role</div>
//               <FormControl variant="outlined" className="parent">
//                 <InputLabel id="role-label">Select Role</InputLabel>
//                 <Select
//                   labelId="role-label"
//                   label="Select Role"
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                   required
//                 >
//                   <MenuItem value="">None</MenuItem>
//                   <MenuItem value="admin">Admin</MenuItem>
//                   <MenuItem value="employee">Employee</MenuItem>
//                 </Select>
//                 <FormHelperText>
//                   Choose the role for the employee
//                 </FormHelperText>
//               </FormControl>
//             </div>
//             <div className="button-secondary">
//               <button
//                 className="create-employee2 cart button-secondary"
//                 onClick={handleCreateEmployee}
//               >
//                 Create Employee
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <img className="vectors-icon" alt="" src="/vectors.svg" />
//     </div>
//   );
// };

// export default EmployeeForm;
