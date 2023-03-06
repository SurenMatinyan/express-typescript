require("dotenv").config();
import * as express from "express";
import { connection } from "../db/connection";
import { exceptionFilter } from "../common/exception/exception-filter";
import router from "./router/router";

const app = express();
connection();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

router(app);

app.use(exceptionFilter);

app.use("*", async (req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Not found",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
