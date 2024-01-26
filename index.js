import express from "express";
import session from 'express-session';
import bcrypt from 'bcrypt';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import eggsRoutes from "./routes/eggs.js";
import employeeRoutes from "./routes/employee.js";
import managerRoutes from "./routes/manager.js";
import adminRoutes from "./routes/admin.js";
import flocksRoutes from "./routes/flocks.js";
import login from "./routes/login.js";
import bulk from "./routes/bulk.controllers.js";
import router from "./helpers/router.js";
import crypto from "crypto";
import cookieParser from 'cookie-parser';


// data imports
import User from "./models/User.js";
import { dataUser } from "./data/index.js";
import OverallStat from "./models/OverallStat.js";
import {
  //dataUser,
  dataOverallStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
const corsoptions ={
  origin:'http://localhost:3000', 
  credentials:true,
  optionsuccessstatus:200
}
app.use(cors(corsoptions));
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const requireLogin = (req, res, next) => {
  if (!session.user) {
    return res.redirect('/login');
  }
  next();
};

const sessionSecret = process.env.SESSION_SECRET || generateSecretKey();
app.use(cookieParser());
app.use(session({
    secret: sessionSecret,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

/* ROUTES */
app.get("/", (req, res) => {
  res.setheader("access-control-allow-origin", "*")
  res.setheader("access-control-allow-credentials", "true");
  res.setheader("access-control-max-age", "1800");
  res.setheader("access-control-allow-headers", "content-type");
  res.setheader( "access-control-allow-methods", "put, post, get, delete, patch, options" );
   });
app.use("/api", router)
app.use("/general", generalRoutes);
app.use("/management", managementRoutes)
app.use("/eggs", eggsRoutes);
app.use("/employee", employeeRoutes);
app.use("/manager", managerRoutes);
app.use("/admin", adminRoutes);
app.use("/flocks", flocksRoutes);
app.use("/bulk", bulk);
app.use("/", login);

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//       const user = await User.findOne({ email: email });
//       if (!user) {
//       res.status(401).send('User not found.');
//       } else {

//       const passwordMatch = password == user.password;
//       if (passwordMatch) {
//           req.session.userId = user._id;

//           res.status(200).json(req.session.userId);
//       } else {
//           res.status(401).send(req.session);
//       }
//       }
//   } catch (err) {
//       res.status(500).send(err);
//   }
// })

app.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect('/login');
    });
  } else {
    res.redirect('/login');
  }
});

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    //OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    //User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));