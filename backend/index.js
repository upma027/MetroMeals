const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const cors = require("cors")

app.use(cors());
// app.use(cors({
//   origin: "https://metro-meals.vercel.app", // Replace with your frontend domain
//   credentials: true
// }));

app.use(express.json());


app.use(express.urlencoded({ extended: true }));
mongoDB();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/OrderData.js"));

app.listen(port, () => {
    console.log(`APP started on port ${port}`);
}) 