import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect } from './db.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from "cookie-parser";
import multer from "multer";



const app = express()
const port = 8800

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
}));





connect()
    .then((connection) => {
        console.log("Connected to database");
    })
    .catch((error)=> {
        console.log("Connection to DB failed")
        console.log(error)
    })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
    });


const upload = multer({ storage });

app.post("/api/upload", upload.single("cover_img"), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use('/api/posts', postRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log("Server running")
})