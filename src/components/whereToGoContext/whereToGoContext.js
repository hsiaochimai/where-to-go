import React from 'react';
const whereToGoContext = React.createContext({
    user: null,
    trips: [],
    places: [],
    set: () => { },
    logout: () => { },
})

export default whereToGoContext;