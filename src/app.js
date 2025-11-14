import express from "express";
import { router } from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
  res.send("Test route working");
  console.log(req.body);
});

app.use("/api", router);

export default app;
