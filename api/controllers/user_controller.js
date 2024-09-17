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

export const updateUserRole = async (req, res) => {
    try {
      const { role } = req.body; // Get the new role from the request body
      const userId = req.params.id; // Get the user ID from the request URL
  
      const db = await connect();
      // Query to find the role ID based on role name
      const roleQuery = "SELECT role_id FROM roles WHERE role_name = @role_name";
      const roleResult = await db
        .request()
        .input('role_name', sql.VarChar, role)
        .query(roleQuery);
  
      const roleId = roleResult.recordset[0]?.role_id;
  
      if (!roleId) {
        return res.status(400).json({ error: 'Invalid role' });
      }
  
      // Update user's role
      const updateQuery = "UPDATE users SET role = @role_id WHERE id = @user_id";
      await db
        .request()
        .input('role_id', sql.Int, roleId)
        .input('user_id', sql.Int, userId)
        .query(updateQuery);
  
      return res.json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).json({ error: 'Database error', details: error });
    }
  };
  
