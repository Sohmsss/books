import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { db } from "./config/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.connect();

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY id DESC");
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.error(err);
    res.render("index.ejs", { books: [] });
  }
});

app.post("/add-book", async (req, res) => {
  const { title, notes, rating, isbn } = req.body;
  try {
    await db.query(
      "INSERT INTO books (title, notes, rating, isbn) VALUES ($1, $2, $3, $4)",
      [title, notes, rating, isbn]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
