const pool = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Checks to see if email and password fields are valid
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required" 
            });
        }

        //Otherwise hash the password and store it into DB
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email",
            [email, hashedPassword]
        );

        return res.status(201).json(result.rows[0]);
    } catch (error) {
        //Handles duplicate email being registered
        if (error.code === "23505") {
            return res.status(400).json({ 
                message: "User already exists"
            });
        }
        
        res.status(500).json({ 
            message: "Internal Server Error: Investigate registerUser endpoint"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Checks to see if email and password fields are valid
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Email and password are required" 
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }        
            
        //Compare password with hashed password from DB
        const match = await bcrypt.compare(password, user.password)

        if (!match) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
        

    } catch (error) {
        res.status(500).json({ 
            message: "Internal Server Error: Investigate login endpoint"
        });
    }
}

module.exports = {
    registerUser,
    login
};