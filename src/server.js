import app from "./app.js";

const PORT = 8080;

app.use((req, res, next) => {
  console.log("🔥 Incoming Request:", req.method, req.url);
  console.log("Headers:", req.headers);
  next();
});

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
