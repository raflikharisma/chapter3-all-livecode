const express = require("express");
const dataDummy = require("./data/dummy.json"); //direct to file

//Using fs modules
const fs = require("fs");
const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

const app = express();
const PORT = 4000;

//middleware
app.use(express.json());

app.get(`/`, (req, res, next) => {
  res.send(`<h1>Hallooo</h1>`);
});
app.get(`/api/v1/data`, (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: dataDummy.length,
    data: {
      customers: dataDummy,
      //   customers: customers,
    },
  });
});

app.post(`/api/v1/`, (req, res) => {
  const newData = req.body;
  dataDummy.push(newData);

  res.status(201).json({
    status: "Success",
    data: {
      customer: newData,
    },
  });
});

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
