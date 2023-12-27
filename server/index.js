const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const pieChartRoutes = require("./routes/pieChart");
const lineChartRoutes = require("./routes/lineChart");

const { connect } = require("./config/Database");
connect();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pieChart", pieChartRoutes);
app.use("/lineChart", lineChartRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
