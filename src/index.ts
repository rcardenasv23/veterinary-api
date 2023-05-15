import express from "express";
import cors from "cors";
import connectDb from "./config/db";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

try {
  connectDb();
  const PORT = process.env.HOSTPORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
  });

  app.use("/pets", require("./routes/pets"));
  app.use("/breeds", require("./routes/breeds"));
  app.use("/animals", require("./routes/animals"));

  //Para rutas invalidas
  app.use(async (req, res) => {
    res.status(200).send(`Route is no where to be found.`);
  });
} catch (e) {
  console.log(e);
}

export default app;
