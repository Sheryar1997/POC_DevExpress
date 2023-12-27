const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const pieChartRoutes = require("./routes/pieChart");

const { connect } = require("./config/Database");
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pieChart", pieChartRoutes);


app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
