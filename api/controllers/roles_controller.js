import { connect } from '../db.js'; // assuming this is your database connection file
import sql from 'mssql';

export const getRoles = async (req, res) => {
  try {
    const db = await connect();
    const query = "SELECT role_id, role_name FROM roles";
    const result = await db.request().query(query);
    
    return res.json({ roles: result.recordset });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return res.status(500).json({ error: 'Database error', details: error });
  }
};
