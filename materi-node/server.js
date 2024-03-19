require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const PORT = process.env.PORT;
const DB = process.env.DATABASE;

mongoose.connect(DB, {
  useNewUrlParser: true,
}).then((con) => {
  console.log("Connection to database success")
});


const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name can't be empty!"]
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  city: String,
  country: {
    type: String,
    required: true,
    default: "Indonesia"
  }
});

const Customer = mongoose.model("Customer", customerSchema);

const customerTest = new Customer({
  name: "rafli kharisma",
  email: "goypunjoungg@gmaial.com",
  phoneNumber: "07878781",

});

customerTest.save().then(doc => {
  console.log(doc);
}).catch((err) => {
  console.log("err" + err)
});

app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
