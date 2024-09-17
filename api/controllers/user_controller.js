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
        
        if (category_req) {
            const cat_q = "SELECT id FROM categories WHERE name = @Cat";
            const category_q_result = await db.request()
                .input('Cat', sql.VarChar, category_req)
                .query(cat_q);
            
            category_id = category_q_result.recordset.length === 1 
                ? category_q_result.recordset[0]['id']
                : null;
        }

        if (category_id) {
            query += " WHERE category_id = @Cat_id";
            countQuery += " WHERE category_id = @Cat_id";  // Apply same filter to count
            query += " ORDER BY id DESC";
            query += " OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY";  // Pagination query
            result = await db.request()
                .input("Cat_id", sql.Int, category_id)
                .input("Offset", sql.Int, offset)
                .input("Limit", sql.Int, limit)
                .query(query);
            totalCountResult = await db.request().input("Cat_id", sql.Int, category_id).query(countQuery);
        } else {
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
        }

        // Fetch total count for pagination
        const totalCount = totalCountResult.recordset[0].total;

        // Exclude password field from each user record
        const users = result.recordset.map(user => {
            const { password, ...other } = user;  // Exclude password from the user object
            return other;  // Return user object without password
        });

        return res.json({
            users: users,  // Send the modified users list without passwords
            total: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (err) {
        console.error('Error during fetching all users:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }
};
