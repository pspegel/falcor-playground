import express from "express";
import path from "path";

const app = express();
const port = 5000;

app.get("/api", (req, res) => res.send("Up and running"));

// Allow Express to serve static content like script files. Without it the React app would not be accessible and the
// <script> tag in the HTML template would be worthless.
app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => console.log(`Server running at port ${port}`));
