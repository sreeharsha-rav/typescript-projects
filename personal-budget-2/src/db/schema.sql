CREATE TABLE Envelopes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    amount DECIMAL(10, 2)
);

CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    date DATE,
    amount DECIMAL(10, 2),
    recipient VARCHAR(255),
    envelope_id INTEGER,
    FOREIGN KEY (envelope_id) REFERENCES Envelopes (id)
);