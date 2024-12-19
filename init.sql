CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(13),
    notes TEXT,
    rating INTEGER CHECK (rating >= 0 AND rating <= 10)
); 