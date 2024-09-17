import { connect } from '../db.js';
import sql from 'mssql';
import jwt from 'jsonwebtoken';

export const allUsers = async (req, res) => {
    try {
        const db = await connect();
        const category_req = req.query.cat;
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 10; // Number of users per page
        const offset = (page - 1) * limit;
        let category_id;
        let query = "SELECT * FROM users";
        let countQuery = "SELECT COUNT(*) AS total FROM users";  // Query to count total users
        var result = '';
        let totalCountResult;
        
        query += " ORDER BY id DESC";
        query += " OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY";
        try {
            result = await db.request()
                .input("Offset", sql.Int, offset)
                .input("Limit", sql.Int, limit)
                .query(query);
        } catch (error) {
            console.log(error);  
            return res.status(500).json({ error: 'Database error', details: error });
        }
        
        totalCountResult = await db.request().query(countQuery);
        

        // Fetch total count for pagination
        const totalCount = totalCountResult.recordset[0].total;

        // Exclude password field from each user record
        const users = await Promise.all(result.recordset.map(async user => {
            const role_name_q = "SELECT role_name FROM roles WHERE role_id = @role_id";
            const role_q_result = await db.request()
                .input('role_id', sql.Int, user.role)
                .query(role_name_q);
                
            user.role = role_q_result.recordset[0]?.role_name || "Unknown";
            const { password, ...other } = user; 
            return other;  // Return user object without password
        }));

        return res.json({
            users: users,  // Send the modified users list without passwords and role changed to name of role
            total: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (err) {
        console.error('Error during fetching all users:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }
};
