const User = require('../models/users');
const bcrypt = require('bcryptjs');

const login = async function (req, res){

    try {
        if(req.body.email && req.body.password){
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
            const token = jwt.sign(user, 'your_jwt_secret', { expiresIn: '1h' });
    
            res.json({ token });
        }
        else {
            res.status(500).json({ message: 'Server error', error });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }

}

module.exports.login = login;