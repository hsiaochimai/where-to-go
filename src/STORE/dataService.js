import store from "./store";
import ls from "local-storage";
import {API_BASE_URL} from '../config'
//set this to an user object to login
let user;

const addAuthTokenHeader =  (headersObj = {}) => {
  let headers = headersObj || new Headers()
  const info=user.JWTTOKEN
  headers.Authorization = `Bearer ${info}`
  console.log(`wtf is going on`,info)
  return headers
 
  
  
  
}
const ds = {
  persistLoginData: async data => {
    return ls("authData", data);
  },
  autoLogin: async () => {
    const data = ls("authData");
    return data;
  },
  doLogout: () => {
    user = null;
    ls("authData", null);
  },
  doLogin: async (email, password) => {
    // TODO set user.JWTTOKEN to the received token
    const headers = new Headers({
      'Content-Type': 'application/json',
  });
     await fetch(`${API_BASE_URL}/auth/login`,{
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers,
    })
    .then(r => {
      if (r.status === 400) {
          throw new Error('Invalid email or password')
      }
      return r
  })
  .then(r => r.json())
  .then(responseData=>{
    user = responseData.user
    user.JWTTOKEN = responseData.authToken
  })
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
    return fetch(`${API_BASE_URL}/trips/${id}`, {
      method: 'delete',
      headers: addAuthTokenHeader(),
  })
    // const { trips } = store;
    // trips.splice(trips.findIndex(t => t.id === id), 1);
    // adding a trip
    // // trips.push({id, xx, name:'Foo' ,.......})
    // console.log(`this is delete`, trips)
  },
  saveTrip: async tripObj => {
   
    const user= await ds.getLoggedInUser()
    tripObj.user_id = user.id
    tripObj.numofdays = +tripObj.numofdays;

    return fetch(`${API_BASE_URL}/trips/create`, {
      method: 'post',
      body: JSON.stringify(tripObj),
      headers: addAuthTokenHeader({
          'Content-type': 'application/json'
      }),
  })
    // const trip = { ...tripObj };

    // //assign an ID
    // if (trip.id === -1) {
    //   trip.id = store.trips.length + 1;
    // }

    // //make sure the user is the current one
    // const user = await ds.getLoggedInUser()
    // trip.user_id = user.id


    // //make sure numofdays is a number
    // trip.numofdays = +trip.numofdays;
    // const { trips } = store;
    // const index = trips.findIndex(t => t.id === trip.id);
    // if (index > -1) {
    //   trips.splice(trips.findIndex(t => t.id === trip.id), 1, trip);
    // } else {
    //   trips.unshift(trip);

    // }
    // console.log(`does this work?`, trips)
  },
  //userID will be token after implementiing JWT tokens
  getTrips: async () => {
    //TODO use user.JWTTOKEN to build the Auth header
    // console.log(`ds:getTrips(${user.email})`);
    // const trips = store.trips.filter(trip => trip.user_id === user.id);
    // trips.forEach(trip => {
    //   //associated records
    //   trip.places = store.places.filter(place => place.trip_id === trip.id);
    // });
    // return trips;
    if (!ds.getLoggedInUser()) {
      // throw new Error(NOT_LOGGED_IN)
      return Promise.reject(new Error('NOT_LOGGED_IN'))
  }
    return fetch(`${API_BASE_URL}/trips`, {
      headers: addAuthTokenHeader(),
  })
      .then(r => r.json())
      .then(data => {
console.log(data.trips)
          return data.trips
      })
  },
  deletePlace: async id => {
    return fetch(`${API_BASE_URL}/trips/deletePlace/${id}/`, {
      method: 'delete',
      headers: addAuthTokenHeader(),
  })
    // const { places } = store;
    // places.splice(places.findIndex(p => p.id === id), 1);
    // console.log(`did the delete work`, places);
  },
  savePlace: async placeObj => {
    const place = { ...placeObj };
    const tripID= place.trip_id
    return fetch(`${API_BASE_URL}/trips/${tripID}/upsertPlace`, {
      method: 'post',
      body: JSON.stringify(place),
      headers: addAuthTokenHeader({
          'Content-type': 'application/json'
      }),})
    //assign an ID
    // if (place.id === -1) {
    //   place.id = store.places.length + 1;
    // }

    //make sure the user is the current one
    // const user = await ds.getLoggedInUser()
    // trip.user_id = user.id


    //make sure numofdays is a number

    // const { places } = store;
    // const index = places.findIndex(p => p.id === place.id);
    // if (index > -1) {
    //   places.splice(places.findIndex(p => p.id === place.id), 1, place);
    // } else {
    //   places.unshift(place);

    // }
    // console.log(`does places work?`, places)
  },
}


export default ds;
