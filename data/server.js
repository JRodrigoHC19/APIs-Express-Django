const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const messageRouter = require("./routes/messages");
const usersRouter = require("./routes/users");
const channelsRouter = require("./routes/channels");


const app = express();

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.URL_BASE);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/messages", messageRouter);
app.use("/users", usersRouter);
app.use("/channels", channelsRouter);


app.listen(process.env.PORT, () => {
  console.log(`Server API MongoDB started on port ${process.env.PORT}`);
});


