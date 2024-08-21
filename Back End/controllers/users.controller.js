const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async function (req, res) {
    console.log({ INFO: "Login controller method called" });
    try {
        if (req.body.email && req.body.password) {
            // Check if user exists
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            // Validate password
            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }
            // Generate JWT
            const token = 'Bearer ' + jwt.sign({ email: user.email, _id: user._id }, jwtSecret, { expiresIn: '1h' });
            console.log({ INFO: "Login controller method completed successfully" });
            res.json({ token });
        }
        else {
            res.status(500).json({ message: 'Server error', error });
        }
    } catch (error) {
        console.log({ Error: error.message });
        res.status(500).json({ message: 'Server error', error });
    }
}
module.exports.login = login;


const signup = async function (req, res) {
    console.log({ INFO: "Signup controller method called" });
    try {
        const { firstName, lastName, email, mobile, role, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const user = new User({ firstName, lastName, email, mobile, role, password });
        await user.save();

        console.log({ INFO: "Sign up controller method completed successfully" });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.log({ Error: error.message });
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports.signup = signup;


const getUsers = async function (req, res) {
    console.log({ INFO: "Get users controller method called" });
    try {
        const users = await User.find();
        console.log({ INFO: "Get users controller method completed successfully" });
        res.json(users);
    } catch (error) {
        console.log({ Error: error.message });
        res.status(500).json({ message: 'Server error', error });
    }
};
module.exports.getUsers = getUsers;