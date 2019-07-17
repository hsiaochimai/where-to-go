## API Routes


### login

`/api/login`

POST body: user.password

return value: JWT token and the user object (excluding the password field)

NOTE: send auth JWT token for all the routes except `/login`

### get trips and their associated places for the current user

`/api/trips`

### trip CRUD

`/api/trips/add`

`/api/trips/:id/update`

`/api/trips/:id/remove`


### trip places CRUD

`/api/trip/:id/addplace`

`/api/trip/:id/updateplace/:placeID`

`/api/trip/:id/removeplace/:placeID`