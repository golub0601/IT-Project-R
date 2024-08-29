import {connect} from '../db.js'
import sql from 'mssql'
import bcrypt from 'bcryptjs'
export const login = (req,res) => {
    res.json('from controller to login');
}

export const register = async (req, res) => {
    try {
        const db = await connect();

        const q = "SELECT * FROM users WHERE email = @Email OR name = @Name";

        const result = await db.request()
            .input('Email', sql.VarChar, req.body.email)
            .input('Name', sql.VarChar, req.body.name)
            .query(q);

        if (result.recordset.length > 0) {
            return res.status(409).json('User already exists');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const insertQuery = "INSERT INTO users (name, email, password) VALUES (@Name, @Email, @Password)";

        await db.request()
            .input('Name', sql.VarChar, req.body.name)
            .input('Email', sql.VarChar, req.body.email)
            .input('Password', sql.VarChar, hash)
            .query(insertQuery);
        
        return res.status(201).json('User created successfully');
    } catch (err) {
        console.error('Error during registration:', err); // Add detailed logging
        return res.status(500).json({ error: 'Database error', details: err });
    }
};



export const logout = (req,res) => {
    res.json('from controller to logout');
}