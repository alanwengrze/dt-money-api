require("dotenv/config");
require("express-async-errors");

const express = require('express');

const AppError = require('./utils/AppError');

const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'https://ignite-dt-money-nu.vercel.app/'
}));

app.use(routes);

app.use((err, request, response, next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }
  console.log(err);
  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app;