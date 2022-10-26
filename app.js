const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });
const errorHandler = require("./error/errorHandler");
const GlobalError = require("./error/GlobalError");
const productRouter = require("./routes/productRouter");
const userRouter = require("./routes/userRouter");
const FAQRouter=require('./routes/FAQRouter');
const basketRouter=require('./routes/basketRouter');
const paymentRouter=require('./routes/paymentRouter');
const brendRouter=require('./routes/brendRouter');
const categoryRouter=require('./routes/categoryRouter');
const reviewRouter=require('./routes/reviewRouter');
const variantRouter=require('./routes/variantRouter');
var cors = require('cors')
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const Product=require('./model/product');
const FAQ=require('./model/FAQ');
const Review=require('./model/review');
const User=require('./model/user');
const Category=require('./model/category');
const Variant=require('./model/variant');




const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Rate limit of 100 is finished",
});

const app = express();
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

const adminOptions = {
  resources: [User,Review,FAQ,Product,Category,Variant],
}

const admin = new AdminJS(adminOptions)



const adminRouter = AdminJSExpress.buildRouter(admin)
app.use(admin.options.rootPath, adminRouter)


app.use(express.json());
app.use(cors());

app.use(limiter);
app.use(helmet());

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/FAQ", FAQRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/basket", basketRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/variants", variantRouter);
app.use("/api/v1/brends", brendRouter);

app.use((req, res, next) => {
  const message = new GlobalError(`The ${req.originalUrl} does not exist`);
  next(message);
});

app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
mongoose.connect(DB, (err) => {
  if (err) return console.log(err);

  console.log("MongoDb connected");

  app.listen(PORT, () => console.log(`Server running in PORT: ${PORT}`));
});
