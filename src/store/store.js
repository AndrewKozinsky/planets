import {createStore} from 'redux'

import {
    setPlanets,
    changePlanetPage,
} from './reducers'



const inicialState = {
    currentPlanetsPage: 1,
    // При наполнении будет массив такого вида:
    /*[
        {page: 1, planets: [{..}, {..}]},
        {page: 3, planets: [{..}, {..}]}
    ]*/
    planets: null,
}

function reducer(state = inicialState, action) {
    switch (action.type) {
        case 'SET_PLANETS':
            return setPlanets(state, action)
        case 'CHANGE_PLANET_PAGE':
            return changePlanetPage(state, action)
            
        default: return state
    }
}


export default createStore(reducer)