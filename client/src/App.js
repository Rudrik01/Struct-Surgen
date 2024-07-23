// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import EmployeeForm from './Components/Register';
import AdminForm from './Components/addadmin';
import AdminDashboard from './Components/taskstat'
import TaskAssignment from './Components/TaskAssignment';
import EmployeeDashboard from './Components/taskdisplay';
import ChangePassword from './Components/resetpassword';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<EmployeeForm />} />
      <Route path="/ChangePassword" element={<ChangePassword />} />
      <Route path="/addadmin" element={<AdminForm />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
      <Route path="/TaskAssignment" element={<TaskAssignment />} />
      <Route path="/taskdisplay/:employeeId" element={<EmployeeDashboard />} />
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default App;
