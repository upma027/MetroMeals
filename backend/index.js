const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db");
const cors = require("cors")

// app.use(cors());
app.use(cors({
  origin: "https://metro-meals2.vercel.app", // Replace with your frontend domain
  credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})


app.use(express.urlencoded({ extended: true }));
mongoDB();

app.get("/", (req, res) => {
    res.send("Hello World");
});


app.use("/api", require("./Routes/CreateUser.js"));
app.use("/api", require("./Routes/DisplayData.js"));
app.use("/api", require("./Routes/OrderData.js"));

app.listen(port, () => {
    console.log(`APP started on port ${port}`);
}) 