## API Routes


### login
/api/login

POST body: user.password

return value: JWT token and the user object (excliding the password field)

### get trips and their associated places for the current user
/api/trips

send auth JWT token

### trip CRUD
/api/trips/add
/api/trips/:id/update
/api/trips/:id/remove


### trip places CRUD
/api/trip/:id/addplace
/api/trip/:id/updateplace/:placeID
/api/trip/:id/removeplace/:placeID
