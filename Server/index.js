import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import PostRoute from './Routes/PostRoute.js' 
import UploadRoute from './Routes/UploadRoute.js'
import cors from 'cors'

const app = express();

// to serve images to public
app.use(express.static('public'))
app.use('/images', express.static("images"))

// MiddleWare Usage
 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors(
//     {
//     origin : ["https://social-media-client-kohl.vercel.app"],
//     methods : ["POST", "GET", "DELETE", "PUT"],
//     credentials : true
// }
));

dotenv.config({});

mongoose.connect( process.env.MONGO_DB, {useNewUrlParser : true, useUnifiedTopology: true }
)
.then(() => app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)))
.catch((Error)=> console.log (Error));


mongoose.connection.on('connected' , ()=>{
        console.log("Database connected successfully")
    });

mongoose.connection.on('disconnected' , ()=>{
        console.log("Database disconnected ")
    });
mongoose.connection.on('error' , ()=>{
        console.log("Error while connection to databasr", error.message)
});


// route Usage

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);