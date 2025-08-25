
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();
import AuthRouter from "./routes/Auth.router.js";
import userRouter from "./routes/user.route.js";
import CategoryRouter from "./routes/Category.route.js";
import blogRouter from "./routes/Blog.route.js";
import commentRouter from "./routes/Comment.route.js";
import LikesRouter from "./routes/Likes.route.js";
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

const _dirname = path.resolve();

app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'https://blog-wapapp.onrender.com',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Mount API routes
app.use('/api/auth', AuthRouter);
app.use('/api/user', userRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/blog', blogRouter);
app.use('/api/comment', commentRouter);
app.use('/api/likes', LikesRouter);

// Serve the Frontend files by Backend
app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get("*",(_,res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { dbName: 'Blog-WebApp' })
  .then(() => { console.log("Connected to MongoDB"); })
  .catch((err) => { console.log("Database connection failed...", err); });

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "Internal Server Error";
  if (res.headersSent) {
    return next(err); // prevents duplicate response
  }
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message
  });
});
