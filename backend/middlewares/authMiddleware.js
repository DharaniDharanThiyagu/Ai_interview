const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        // console.log('Authorization Header:', token);
        

        if (!token || !token.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Not authorized, no token', success: false });
        }

        token = token.split(' ')[1]; // Extract the token
        // console.log('Extracted Token:', token);
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log('Decoded Token:', decoded);
        

        const user = await User.findById(decoded.id).select('-password');
        // console.log('Authenticated User:', user);
        
        if (!user) {
            return res.status(401).json({ message: 'Not authorized, user not found', success: false });
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        console.error('JWT auth error:', error);
        return res.status(401).json({ message: 'Not authorized, token failed', success: false });
    }
};

module.exports = { protect };
