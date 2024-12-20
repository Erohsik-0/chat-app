import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import cookieParser from "cookie-parser";


const app = express();
const PORT = process.env.PORT || 5000;


dotenv.config();
    

app.use(express.json());//to parse the incoming request with JSON payloads (from req.body)
app.use(cookieParser());//to parse the incoming request with cookies (from req.cookies)


app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);


// app.get("/" , (req,res) => {
//     //root route -> http://localhost:5000/
//     res.send("Hello World!!!");
// });


app.listen(PORT,() => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});  