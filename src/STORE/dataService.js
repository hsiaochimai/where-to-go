
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
  
  },
  //userID will be token after implementiing JWT tokens
  getTrips: async () => {
    //TODO use user.JWTTOKEN to build the Auth header
   
    if (!ds.getLoggedInUser()) {
      
      return Promise.reject(new Error('NOT_LOGGED_IN'))
  }
    return fetch(`${API_BASE_URL}/trips`, {
      headers: addAuthTokenHeader(),
  })
      .then(r => r.json())
      .then(data => {

          return data.trips
      })
  },
  deletePlace: async id => {
    return fetch(`${API_BASE_URL}/trips/deletePlace/${id}/`, {
      method: 'delete',
      headers: addAuthTokenHeader(),
  })
  
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
   
  },
}


export default ds;
