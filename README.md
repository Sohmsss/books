# Reading List

A simple book tracking app that lets you save and rate books you've read.

## Setup

1. Install Node.js and PostgreSQL
2. Create a database called `books`
3. Run this SQL:
   ```sql
   CREATE TABLE books (
       id SERIAL PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       isbn VARCHAR(13),
       notes TEXT,
       rating INTEGER CHECK (rating >= 0 AND rating <= 10)
   );
   ```

4. Create a `.env` file with:
   ```env
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=books
   DB_PASSWORD=your_password
   DB_PORT=5432
   PORT=3000
   ```

5. Run:
   ```bash
   npm install
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Features

- Add books with title, notes, and rating
- Book covers from Open Library API
- Edit and delete books
- Dark mode interface

## Dependencies

- `express`
- `pg` (PostgreSQL client)
- `dotenv`
- `ejs`
- `body-parser`

## Notes

- Book covers are fetched from Open Library API using ISBN
- Default port is `3000` if not specified in `.env`
- Requires a PostgreSQL database
- All data is stored locally in your database
