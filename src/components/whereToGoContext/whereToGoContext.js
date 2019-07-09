import React from 'react'
const whereToGoContext = React.createContext({
    user: null,
    trips: [],
    places: [],
    set: () => { },
})

export default whereToGoContext;