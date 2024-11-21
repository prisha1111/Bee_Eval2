const jwt = require('jsonwebtoken'); // Initialize JSON Web Token

// Create a JWT token for the user
const createToken = (userData) => {
    try {
        const token = jwt.sign(
            { id: userData.id, email: userData.email }, // Minimal data in payload for security
            process.env.JWT_SECRET || "defaultSecret", // Use a default secret if not provided in env
            { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
        );
        return token;
    } catch (err) {
        throw new Error("Error creating token: " + err.message);
    }
};

// after loginUser, we are getting the token and for validating in jwt token,that it is correct or not,we will proceed with secure routes,to get/post/update/delete
const validateJwtToken = (req, res, next) => {
    //we are checking that token is avaiable or not in request handlers
    const tokenCheck = req.headers.authorization;
    //option 1: req handler token,authorization not sent,(doesn't exists)
    if (!tokenCheck) {
        return res.status(401).json({ err: 'Token not avaiable' });
    }

    //option 2:req header getting token: but not in a right format:
    //Authorization: BASIC / BEARER
    //BASIC btoa(USERNAME:PASSWORD)->BASIC hjwieduweifjhvd [BASE64]
    //BEARER fdjfhuejrenfdierjdf
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ err: "Invalid Token" });
    }
    try {
        const validateToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = validateToken;
        next();
    } catch (err) {
        return res.status(401).json(err.message);
    }
}

module.exports = { createToken, validateJwtToken };
