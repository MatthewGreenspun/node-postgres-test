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

const css = ` 
    <style>
      * {
        font-family: arial, sans-serif;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      
      td, th {
        border: 1px solid black;
        text-align: left;
        padding: 8px;
      }
      
      tr:nth-child(even) {
        background-color: #dddddd;
      }
    </style>
`;

app.get("/", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT person.id AS person_id, person.name AS name, post.post_text AS post_text FROM post RIGHT JOIN person ON person.id = post.person_id"
  );
  res.send(`
    ${css}
    <h1>People and their posts: </h1>
    <label for="new-post-text">Create a post: </label>
    <textarea id="new-post-text" value="My first post!"></textarea>
    <table>
      <tr>
        <th>Name</th>
        <th>Post text</th>
      </tr>
      ${rows
        .map(
          (row: {
            person_id: string;
            name: string;
            post_text: string | null;
          }) => `
        <tr>
          <td>${row.name}
            ${
              row.post_text === null
                ? `<br>
                  <button onclick="window.location.href=\`/create-post?person_id=${row.person_id}&text=\${document.getElementById('new-post-text').value||'my%20first%20post!'}\`">Create Post</button>`
                : ""
            }</td>
          <td>${row.post_text ?? "No posts from this user"}</td>
        </tr>`
        )
        .toString()
        .replace(/,/g, "")}
    </table>
  `);
});

app.get("/create-post", (req, res) => {
  const { person_id: personId, text } = req.query;
  try {
    pool
      .query(
        "INSERT INTO post (id, person_id, post_text) VALUES (uuid_generate_v4(), $1, $2)",
        [personId, text]
      )
      .then(() => {
        res.redirect("/");
      });
  } catch (err) {
    console.error(err);
    res.send("<h1>There was an error. Please try again later :(</h1>");
  }
});

app.get("/people", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM person");
  res.send(`
    ${css}
    <h1>Person table: </h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Date of Birth</th>
      </tr>
      ${rows
        .map(
          (row: { id: string; name: string; date_of_birth: Date }) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.name}</td>
          <td>${row.date_of_birth.toString().slice(0, 15)}</td>
        </tr>
      `
        )
        .toString()
        .replace(/,/g, "")}
    </table>
  `);
});

app.get("/posts", async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM post");
  res.send(`
    ${css}
    <h1>Posts table: </h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Person ID</th>
        <th>Post text</th>
      </tr>
      ${rows
        .map(
          (row: { id: string; person_id: string; post_text: string }) => `
        <tr>
          <td>${row.id}</td>
          <td>${row.person_id}</td>
          <td>${row.post_text}</td>
        </tr>
      `
        )
        .toString()
        .replace(/,/g, "")}
    </table>
  `);
});

app.listen(3000, () => console.log("listening on port 3000 ..."));
