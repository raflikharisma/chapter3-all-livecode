const express = require("express");
const morgan = require("morgan");
//Using fs modules

const app = express();
const customerRouter = require("./routes/customerRoutes")
app.use(express.json());//middleware
app.use(morgan('dev')); // third party middleware


app.use((req, res, next) =>{
  req.requesTime = new Date().toISOString();
  next();
})

app.use(`/api/v1/customers`, customerRouter);



module.exports = app;