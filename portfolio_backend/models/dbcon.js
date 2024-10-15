const mongoose = require("mongoose");
// alhXy4GQSKTqE67g
// prachisaid16

// const url = `mongodb+srv://harshsaid31:${'harshsaid31'}@cluster0.zpx0udp.mongodb.net/?retryWrites=true&w=majority`
const url = `mongodb+srv://prachisaid16:${'prachisaid16'}@portfoliodb.9rjjlem.mongodb.net/?retryWrites=true&w=majority&appName=portfolioDB`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection successfull");
  })
  .catch((err) => console.log("db not connected"));