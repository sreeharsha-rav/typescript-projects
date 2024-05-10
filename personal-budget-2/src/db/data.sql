INSERT INTO Envelopes (name, amount)
VALUES 
    ('Groceries', 100),
    ('Gas', 50),
    ('Entertainment', 200),
    ('Clothing', 75),
    ('Eating Out', 150),
    ('Savings', 100),
    ('Miscellaneous', 50);

INSERT INTO Transactions (date, amount, recipient, envelope_id)
VALUES 
    ('2022-01-01', 20.00, 'Groceries', 1),
    ('2022-01-02', 30.00, 'Gas', 2),
    ('2022-01-03', 50.00, 'Entertainment', 3),
    ('2022-01-04', 25.00, 'Clothing', 4),
    ('2022-01-05', 30.00, 'Eating Out', 5),
    ('2022-01-06', 50.00, 'Savings', 6),
    ('2022-01-07', 10.00, 'Miscellaneous', 7);