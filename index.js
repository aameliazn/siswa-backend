const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const client = require("./connection");
const response = require("./response");

const middleware = (req, res, next) => {
  if (req?.query?.token == "amelia") {
    next();
  } else {
    res.send("forbidden!");
  }
};

app.use(middleware);
// bisa pakai cara disimpan setelah path dan sebelum callback
// app.get("/api/siswa", middleware, (req, res) => {});

app.use(bodyParser.json());

app.get("/api/siswa", (req, res) => {
  const sql = "SELECT * FROM m_expressjs_first.t_siswa ORDER BY id ASC";
  client.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields?.rows, "get all data siswa", res);
  });
});

app.get("/api/siswa/:nis", (req, res) => {
  const nis = req?.params?.nis;
  const sql = `SELECT * FROM m_expressjs_first.t_siswa WHERE nis = ${nis}`;
  client.query(sql, (err, fields) => {
    if (err) throw err;
    response(200, fields?.rows, "get detail siswa", res);
  });
});

app.post("/api/siswa", (req, res) => {
  const { nis, name, class_, address } = req?.body;
  const sql = `INSERT INTO m_expressjs_first.t_siswa (nis, name, class, address) VALUES (${nis}, '${name}', '${class_}', '${address}')`;
  client.query(sql, (err, fields) => {
    const data = { isSuccess: fields?.rowCount || 0 };
    if (err) response(500, data, `${err?.detail || err?.routine}`, res);
    if (fields?.rowCount) {
      response(200, data, "successfully added data", res);
    }
  });
});

app.put("/api/siswa", (req, res) => {
  const { nis, name, class_, address } = req?.body;
  const sql = `UPDATE m_expressjs_first.t_siswa SET name = '${name}', class = '${class_}', address = '${address}' WHERE nis = ${nis}`;
  client.query(sql, (err, fields) => {
    const data = { isSuccess: fields?.rowCount || 0 };
    if (err) response(500, data, `${err?.detail || err?.routine}`, res);
    if (fields?.rowCount) {
      response(200, data, "successfully updated data", res);
    } else {
      response(404, data, "user not found", res);
    }
  });
});

app.delete("/api/siswa", (req, res) => {
  const { nis } = req?.body;
  const sql = `DELETE FROM m_expressjs_first.t_siswa WHERE nis = ${nis}`;
  client.query(sql, (err, fields) => {
    const data = { isSuccess: fields?.rowCount || 0 };
    if (err) response(500, data, `${err?.detail || err?.routine}`, res);
    if (fields?.rowCount) {
      response(200, data, "successfully deleted data", res);
    } else {
      response(404, data, "user not found", res);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
