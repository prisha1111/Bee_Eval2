const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const { error, success } = require('../utils/handler');

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send(error(400, "Email and password are required!"));
        }

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send(error(401, "User not found! Please sign up."));
        }

        // Validate password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send(error(400, "Invalid email or password!"));
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET ,
            { expiresIn: "1h" } // Token expiration time
        );

        // console.log("Generated Token:", token);

        // Send success response as an array
        
        return res.status(200).send({
            statusCode: 200,
            message: "Login successful!",  // Success message
            token: token,                  // JWT token
            user: {                        // User info
                id: user._id,
                username: user.username,
                email: user.email,
            }
        });
    } catch (err) {
        return res.status(500).send(error(500, err.message));
    }
};

// Signup Controller
const signupContorller = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate input fields
        if (!username || !email || !password) {
            return res.status(400).send(error(400, "All fields are required!"));
        }

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).send(error(400, "User already exists!"));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await userModel.create({
            username,
            email,
            password: hashedPassword,
        });

        return res.status(201).send(success(201, "User created successfully!"));
    } catch (err) {
        return res.status(500).send(error(500, err.message));
    }
};

// Logout Controller
const logoutController = async (req, res) => {
    // In a stateless approach, logging out is handled on the client by removing the token.
    return res.status(200).send(success(200, "Logout successful!"));
};

module.exports = {
    loginController,
    logoutController,
    signupContorller,
};