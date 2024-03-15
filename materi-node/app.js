const express = require("express");
const dataDummy = require("./data/dummy.json"); //direct to file
const morgan = require("morgan");
//Using fs modules


const app = express();
const PORT = 4000;

const customerRouter = require("./routes/customerRoutes")


app.use(express.json());//middleware
app.use(morgan('dev')); // third party middleware


// our own middleware
app.use((req, res, next) =>{
  req.requesTime = new Date().toISOString();
  next();
})


app.use(`/api/v1/customers`, customerRouter);

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
