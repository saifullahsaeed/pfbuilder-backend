import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from 'connect-mongo'
import AuthRouter from "./pages/api/auth/login.controller";
import PfRouter from "./Routes/routes";
import mongoose from "mongoose"
import User from "./models/user";
import Cors from "cors";
import passport from "passport";
const multer = require('multer');
dotenv.config();

const app: Express = express();

app.use(Cors());

let clientP = mongoose.connect(`${process.env.MONGO_DB_CONNECTION_STRING}${process.env.MONGO_DB_NAME}`);

mongoose.connection.on("error", (err: any) => {
  console.log(err);
}).once("open", () => {

  const storage = multer.diskStorage({
    destination: function(req : Request, file : any, callback : any) {
      callback(null, '/src/media');
    },
    filename: function (req : Request, file : any, callback : any) {
      callback(null, file.fieldname);
    }
  });
console.log(mongoose.models);
  console.log("Connected to MongoDB");
}).once("close", () => {
  console.log("Disconnected from MongoDB");
}).once("connected", () => {
  console.log("Connected to MongoDB");
});
const port = process.env.PORT;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    store:  MongoStore.create({
      mongoUrl: `${process.env.MONGO_DB_CONNECTION_STRING}${process.env.MONGO_DB_NAME}`, 
      ttl:  60 * 60 * 24 * 7

    }),
    saveUninitialized: true ,
  })
);
require("./utils/passport")(passport);
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
 const USER = await User.findById(id);
 done(null, USER);
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (_req: Request, res: Response) => {
  res.send("Server is running");
});

app.use("/api/auth", AuthRouter);
app.use("/api", passport.authenticate("bearer", { session: true }),  PfRouter);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
