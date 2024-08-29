import jwt from 'jsonwebtoken';
import User from '../Models/userModel.js'; // Assuming the User model is in the models directory

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting token in the format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Assuming req.user.id contains the user ID from the token

    if (user && user.role === 'admin') {
      next(); // User is an admin, allow access
    } else {
      return res.status(403).json({ message: 'Access Denied: Admins only' });
    }
  } catch (error) {
    console.error('Error checking admin role:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { verifyToken, isAdmin };
