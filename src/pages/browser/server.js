const port = process.env.PORT || 3001

const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

// var logger = function(req, res, next) {
//   console.log("GOT REQUEST !");
//   next(); // Passing the request to the next handler in the stack.
// }

// app.configure(function(){
//   app.use(logger); // Here you add your logger to the stack.
//   app.use(app.router); // The Express routes handler.
// });

app.all("*", (req, res, next) => {
  console.log(req); // do anything you want here
  next();
});

app.get('/', (req, res) => res.send("success"))
app.listen(port, () => console.log(`Server listening on port ${port}!`))
