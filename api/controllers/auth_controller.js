import { connect } from '../db.js';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const db = await connect();

        // Check if user exists  
        const q = "SELECT * FROM users WHERE email = @Email";
        
        const result = await db.request()
            .input('Email', sql.VarChar, req.body.email)
            .query(q);

        if (result.recordset.length < 1) {
            return res.status(404).json('User does not exist');
        }

        const user = result.recordset[0];
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json('Invalid password');
        }

        // Exclude the password from the user object
        const { password, ...other } = user;
        
        
        const token = jwt.sign({ id: user.id }, "jwtkey");

        // Set the cookie with the token
        return res.cookie("access_token", token, {
            httpOnly: true, 
        }).status(200).json(other); // Return the user data without the password

    } catch (err) {
        console.error('Error during login:', err); 
        return res.status(500).json({ error: 'Database error', details: err });
    }
};



export const register = async (req, res) => {
    try {
        const db = await connect();

        const q = "SELECT * FROM users WHERE email = @Email";

        const result = await db.request()
            .input('Email', sql.VarChar, req.body.email)
            .query(q);

        if (result.recordset.length > 0) {
            return res.status(409).json('User already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (name, surname, email, password ) VALUES (@Name, @Surname, @Email, @Password)";

        await db.request()
            .input('Name', sql.VarChar, req.body.name)
            .input('Email', sql.VarChar, req.body.email)
            .input('Surname', sql.VarChar, req.body.surname)
            .input('Password', sql.VarChar, hash)
            .query(insertQuery);
        
        return res.status(201).json('User created successfully');
    } catch (err) {
        console.error('Error during registration:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }
};

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        sameSite: "none",
        secure: true
    }).status(200).json("User has been logged out.")
};
