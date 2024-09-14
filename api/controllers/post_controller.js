import { connect } from '../db.js';
import sql from 'mssql';
import jwt from 'jsonwebtoken';

// Fetch all posts, optionally filtered by category
export const getAllPosts = async (req, res) => {
    try {
        const db = await connect();
        const category_req = req.query.cat;
        const page = parseInt(req.query.page) || 1; // Current page
        const limit = parseInt(req.query.limit) || 6; // Number of posts per page
        const offset = (page - 1) * limit;
        let category_id;
        let query = "SELECT * FROM posts";
        let countQuery = "SELECT COUNT(*) AS total FROM posts";  // Query to count total posts
        var result = '';
        let totalCountResult;
        
        if (category_req) {
            const cat_q = "SELECT id FROM categories WHERE name = @Cat";
            const category_q_result = await db.request()
                .input('Cat', sql.VarChar, category_req)
                .query(cat_q);
            // console.log(category_q_result);
            
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
        }

        else {
            query += " ORDER BY id DESC";
            query += " OFFSET @Offset ROWS FETCH NEXT @Limit ROWS ONLY";
            try {
                result = await db.request()
                    .input("Offset", sql.Int, offset)
                    .input("Limit", sql.Int, limit)
                    .query(query);
                // console.log("///////////////////////");
                // console.log(result);
                // console.log("///////////////////////");    
            } catch (error) {
                console.log(error);  
                return res.status(500).json({ error: 'Database error', details: error }); 
            }
            
            totalCountResult = await db.request().query(countQuery);
        }

        // Fetch total count for pagination
        const totalCount = totalCountResult.recordset[0].total;

        return res.json({
            posts: result.recordset,
            total: totalCount,
            page: page,
            totalPages: Math.ceil(totalCount / limit)
        });
    } catch (err) {
        console.error('Error during fetching all posts:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }
};
// Fetch a single post by ID and reccomended posts
export const getPost = async (req, res) => {
    try {
        const db = await connect();
        const postId = parseInt(req.params.id, 10);

        if (isNaN(postId)) {
            return res.status(400).json({ error: 'Invalid post ID' });
        }

        // Combine both queries into a single one
        const q = `
            -- Fetch the single post
            SELECT posts.*, users.name, users.surname 
            FROM posts 
            JOIN users ON posts.user_id = users.id
            WHERE posts.id = @Post_id;

            -- Fetch recommended posts from the same category, excluding the current post
            SELECT TOP 5 * 
            FROM posts 
            WHERE category_id = (SELECT category_id FROM posts WHERE id = @Post_id) 
              AND id != @Post_id;
        `;

        // Execute both queries at once
        const result = await db.request()
            .input('Post_id', sql.Int, postId)
            .query(q);

        // result.recordsets[0] contains the single post
        const post = result.recordsets[0][0];

        // result.recordsets[1] contains the recommended posts
        const recommendedPosts = result.recordsets[1];

        // Return both the post and the recommended posts
        return res.status(200).json({
            post,
            recommendedPosts
        });
    } catch (err) {
        console.error('Error during fetching post and recommended posts:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
    }
};

export const addPost = (req, res) => {
    
    
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json('Not authenticated');
        }

        jwt.verify(token, "jwtkey", async (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");
            const db = await connect();
            console.log(userInfo.id);
      const q =
        "INSERT INTO posts(title, body, cover_img, category_id, date,user_id) VALUES (@Title, @Body, @Cover_img, @Category_id,@Date,  @User_id)";
    
        // const user_id_p  = parseInt(userInfo.id, 10)
        const values = [
            req.body.title,
            req.body.desc,
            req.body.cover_img, 
            req.body.category_id,
            req.body.date,
            userInfo.id
        ];
        
        const result = await db.request()
                .input("Title", sql.VarChar,values[0])
                .input("Body", sql.VarChar,values[1])    
                .input("Cover_img", sql.VarChar,values[2])
                .input("Category_id", sql.Int,values[3])
                .input("Date",sql.DateTime, values[4])
                .input("User_id", sql.Int, values[5])
                .query(q);
        
            return res.json("Post has been created.");
            
        });
    } catch (err) {
        console.error('Error during deleting single post:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }

  };

// Update an existing post (implementation pending)
export const updatePost = async (req, res) => {  
    try{
        const token = req.cookies.access_token;
        if (!token) return res.status(401).json("Not authenticated!");
        
        const db = await connect();
        const postId = req.params.id;
        const q = `
            UPDATE posts 
            SET title = @Title, body = @Body, cover_img = @Cover_img, category_id = @Category_id 
            WHERE id = @Post_id;
        `;
    
        const values = [req.body.title, req.body.body, req.body.cover_img, req.body.category_id];
    
        
        const result = await db.request()
            .input("Title", sql.VarChar,values[0])
            .input("Body", sql.VarChar,values[1])    
            .input("Cover_img", sql.VarChar,values[2])
            .input("Category_id", sql.Int,values[3])
            .input("Post_id", sql.Int, postId)
            .query(q);

        // if (err) return res.status(500).json(err);
        
        return res.json("Post has been updated.");
        
    }catch(err){
        console.error('Error during editing post:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    } 
  };

// Delete a post
export const deletePost = async (req, res) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json('Not authenticated');
        }

        jwt.verify(token, "jwtkey", async (err, userInfo) => {
            if (err) return res.status(403).json("Token is not valid!");

            const postId = parseInt(req.params.id, 10);
            if (isNaN(postId)) {
                return res.status(400).json({ error: 'Invalid post ID' });
            }
            const db = await connect();
            const q = "DELETE FROM posts WHERE id = @post_id AND user_id = @user_id";
            const result = await db.request()
                .input('post_id', sql.Int, postId)
                .input('user_id', sql.Int, userInfo.id)
                .query(q);

            if (result.rowsAffected[0] === 0) {
                return res.status(404).json("Post not found or you are not authorized to delete it.");
            }

            return res.status(200).json("Post has been deleted!");
        });
    } catch (err) {
        console.error('Error during deleting single post:', err);
        return res.status(500).json({ error: 'Database error', details: err });
    }
};
