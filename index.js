const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const client = require("./connection");
const response = require("./response");

app.use(bodyParser.json());

app.get("/api/siswa", (req, res) => {
  response(404, "not found", "lalala", res);
});

app.get("/api/siswa/:nis", (req, res) => {
  const nis = req?.params?.nis;
  response(200, "data spesifik siswa", `spesifik siswa by nis ${nis}`, res);
});

app.post("/api/siswa", (req, res) => {
  response(200, "ini data post", "ini post", res);
});

app.put("/api/siswa", (req, res) => {
  response(200, "ini data put", "ini put", res);
});

app.delete("/api/siswa", (req, res) => {
  response(200, "ini data delete", "ini delete", res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
