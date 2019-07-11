import store from "./store";
import ls from "local-storage";

//set this to an user object to login
let user;
const ds = {
  persistLoginData: async data => {
    return ls("authData", data);
  },
  autoLogin: async () => {
    const data = ls("authData");
    return data;
  },
  doLogin: async (email, password) => {
    user = store.users.find(
      user => user.email === email && user.password === password
    );
    if (user) {
      ds.persistLoginData(user);
    }
    return user;
  },
  getLoggedInUser: async () => {
    const savedUser = await ds.autoLogin();
    if (!user && savedUser) {
      user = savedUser;
    }
    return user;
  },

  deleteTrip: async id => {
    const { trips } = store;
    trips.splice(trips.findIndex(t => t.id === id), 1);
    // adding a trip
    // trips.push({id, xx, name:'Foo' ,.......})
    console.log(`this is delete`,trips)
  },
  saveTrip: async tripObj => {
    const trip = { ...tripObj };
    
    //assign an ID
    if (trip.id === -1) {
      trip.id = store.trips.length +1;
    }

    //make sure the user is the current one
    const user = await ds.getLoggedInUser()
    trip.user_id = user.id


    //make sure numOfDays is a number
    trip.numOfDays = +trip.numOfDays;
    const { trips } = store;
    const index = trips.findIndex(t => t.id === trip.id);
    if (index > -1) {
      trips.splice(trips.findIndex(t => t.id === trip.id), 1, trip);
    } else {
      trips.unshift(trip);
     
    }
    console.log(`does this work?`,trips)
  },
  //userID will be token after implementiing JWT tokens
  getTrips: async () => {
    console.log(`ds:getTrips(${user.email})`);
    const trips = store.trips.filter(trip => trip.user_id === user.id);
    trips.forEach(trip => {
      //associated records
      trip.places = store.places.filter(place => place.trip_id === trip.id);
    });
    return trips;
  },
  deletePlace: async id => {
    const { places } = store;
    places.splice(places.findIndex(p => p.id === id), 1);
    console.log(`did the delete work`, places);
  }
};

export default ds;
