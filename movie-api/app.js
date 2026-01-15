import express from 'express'
import connectDb from './db/connectDb.js'
import route from './routes/route.js'
import cors from 'cors';

const app = express();
const Port = 3000; // 👈 Add this line here!

app.use(cors());
app.use(express.json());

// Static Folder (Serve images)
app.use('/uploads', express.static('./uploads'));

// API Routes
app.use('/', route);

// Database Connection
const Db_URL = process.env.Db_URL || "mongodb://127.0.0.1:27017";
const Db_Name = "FirstDB";
connectDb(Db_URL, Db_Name);

// Start Server
app.listen(Port, () => {
    console.log(`Successful connection on Port ${Port}`);
});