// client/src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import EmployeeForm from './Components/Register';
import AdminForm from './Components/addadmin';
import AdminDashboard from './Components/taskstat';
import TaskAssignment from './Components/TaskAssignment';
import EmployeeDashboard from './Components/EmployeeDashboard';
import ChangePassword from './Components/resetpassword';
import AdminHome from './Components/AdminHome';
import ProtectedRoute from './Components/ProtectedRoute';
import TaskDetail from './Components/TaskDetail'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/AdminHome" element={<ProtectedRoute element={AdminHome} roles={['admin']} />} />
      <Route path="/register" element={<ProtectedRoute element={EmployeeForm} roles={['admin']} />} />
      <Route path="/ChangePassword" element={<ProtectedRoute element={ChangePassword} />} />
      <Route path="/addadmin" element={<ProtectedRoute element={AdminForm} roles={['admin']} />} />
      <Route path="/AdminDashboard" element={<ProtectedRoute element={AdminDashboard} roles={['admin']} />} />
      <Route path="/TaskAssignment" element={<ProtectedRoute element={TaskAssignment} roles={['admin']} />} />
      <Route path="/taskdisplay/:employeeId" element={<EmployeeDashboard />} />
      <Route path="/taskdetail/:companyname" element={<TaskDetail />} /> {/* Add new route */}
      {/* Add other routes as needed */}
    </Routes>
  );
};

export default App;
