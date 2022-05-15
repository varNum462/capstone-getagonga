require("dotenv").config();
const connectDb = require("./db/db");
const usersRouter = require("./routes/users");
const auctionsRouter = require("./routes/auctions");
const express = require("express");
const cors = require("cors");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.use(`/api/users`, usersRouter);
app.use(`/api/auctions`, auctionsRouter);
//app.use(`/api/items`, itemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

