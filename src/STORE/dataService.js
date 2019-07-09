import store from "./store";
let user;
const ds = {
  doLogin: async (email, password) => {
    user = store.users.find(
      user => user.email === email && user.password === password
    );
    return user;
  },
  getLoggedInUser: async () => {
      return user
  },
  //userID will be token after implementiing JWT tokens
  getTrips: async () => {
    return store.trips.filter(trip => trip.user_id === user.id);
  }
};

export default ds;
