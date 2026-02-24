import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectAdmin = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            
            // Token verify karein
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Database se user nikalain password ke bina
            req.user = await User.findById(decoded.id).select('-password');

            // Check karein ke role admin hai ya nahi
            if (req.user.role !== 'admin') {
                return res.status(403).json({ message: "Access Denied. Only Admin can perform this action." });
            }

            next(); // Agar admin hai toh aage jane do
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};