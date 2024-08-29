import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from './db.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'


const app = express()
const port = 8800

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }));

app.use(cors());

connect()
    .then((connection) => {
        console.log("Connected to database");
    })
    .catch((error)=> {
        console.log("Connection to DB failed")
        console.log(error)
    })


app.use('/api/posts', postRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(port, () => {
    console.log("DB Connected")
})