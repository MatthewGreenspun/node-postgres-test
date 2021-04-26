require("dotenv").config();
import express from "express";
import pg from "pg";

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});
const app = express();

app.get("/", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM person");
  res.send(`
    <style>
      table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #dddddd;
      }
    </style>
    <h1>Person table: </h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date of Birth</th>
      </tr>
      ${rows
        .map(
          (row) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${(<Date>row.date_of_birth).toString().slice(0, 15)}</td>
        </tr>
      `
        )
        .toString()
        .replace(/,/g, "")}
    </table>
  `);
});

app.listen(3000, () => console.log("listening on port 3000 ..."));
