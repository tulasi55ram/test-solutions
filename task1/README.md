
# Database improvements 

## Adding Foreign keys between tables 
Foreign keys are missing between the tables.  They help ensure referential integrity, meaning you cannot have a booking for a non-existent user or parc.

Bookings to User: The userId in the bookings table should be a foreign key that references the id in the user table.


`ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_user
FOREIGN KEY (userId) REFERENCES user(id);`

Bookings to Parc: The parc in the bookings table should be a foreign key that references the id in the parc table.

`ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_parc
FOREIGN KEY (parc) REFERENCES parc(id);`

## Index on foreign keys: 

Creating indexes on foreign keys can significantly improve the performance of queries involving joins, lookups, and other operations that enforce referential integrity.

`CREATE INDEX idx_user_id ON bookings(userId);
CREATE INDEX idx_parc_id ON bookings(parc);`


## Consistent Data Types: 

Ensure that the data types of the foreign key columns match the primary key columns they reference. In your case, make sure the id fields in user, parc, and the corresponding fields in bookings (userId and parc) are of the same type.

## Cascade implications 
Cascade implications of a user or a parc being deleted or updated: 
(Depends on the requirements)

CASCADE: Automatically delete all bookings associated with a deleted user or parc.
SET NULL: Set the foreign key value to NULL in the bookings table if the referenced record in the user or parc table is deleted.


`ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_user
FOREIGN KEY (userId) REFERENCES user(id)
ON DELETE CASCADE;`

`ALTER TABLE bookings
ADD CONSTRAINT fk_bookings_parc
FOREIGN KEY (parc) REFERENCES parc(id)
ON DELETE CASCADE;`