const express = require("express");
const dataDummy = require("./data/dummy.json"); //direct to file

//Using fs modules
const fs = require("fs");
const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));

const app = express();
const PORT = 4000;

//middleware
app.use(express.json());



const defaultRooter = (req, res, next) => {
  res.send(`<h1>Hallooo</h1>`);
};

const getAllData = (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: dataDummy.length,
    data: {
      customers: dataDummy,
    },
  });
}

const getDataById = (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  const customer = customers.find((cust) => cust._id == id);
  console.log(customer);

  res.status(200).json({
    status: "Success",
    data: {
      customers: customer,
    },
  });
}

const createData = (req, res) => {
  const newData = req.body;
  customers.push(newData);

  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), (err) => {
    res.status(201).json({
      status: "Success",
      data: {
        customer: newData,
      },
    });
  });
}

const updateDataById =  (req, res) => {
  const { id } = req.params;

  const customer = customers.find((cust) => cust._id == id);
  const customerFindex = customers.findIndex((cust) => cust._id == id);
  if (!customer) {
    res.status(404).json({
      status: "Failed",
      message: "Data not found",
    });
  }

  customers[customerFindex] = { ...customers[customerFindex], ...req.body };

  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), (err) => {
    res.status(200).json({
      status: "success",
      message: "Successfully Updating data",
    });
  });
}

const deleteDataById = (req, res) => {
  const { id } = req.params;

  const customer = customers.find((cust) => cust._id == id);
  const customerFindex = customers.findIndex((cust) => cust._id == id);
  if (!customer) {
    res.status(404).json({
      status: "Failed",
      message: "Data not found",
    });
  }

  customers.splice(customerFindex, 1);

  fs.writeFile(`${__dirname}/data/dummy.json`, JSON.stringify(customers), (err) => {
    res.status(200).json({
      status: "success",
      message: "Successfully Deleting data",
    });
  });
}



//initialize rooting
app.route(`/api/v1/customers`).get(getAllData).post(createData);
app.route(`/api/v1/customers/:id`).get(getDataById).patch(updateDataById).delete(deleteDataById);
app.get('/', defaultRooter);


app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
