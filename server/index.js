const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const pieChartRoutes = require("./routes/pieChart");
const lineChartRoutes = require("./routes/lineChart");

const { connect } = require("./config/Database");
connect();

app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pieChart", pieChartRoutes);
app.use("/lineChart", lineChartRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
