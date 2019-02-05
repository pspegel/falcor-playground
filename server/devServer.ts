import express from "express";

const api = express();
const port = 5000;

api.get("/", (req, res) => res.send("Up and running"));

api.listen(port, () => console.log(`API running at port ${port}`));
