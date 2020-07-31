import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'

import PlanetsList from '../PlanetsList'
import Statistics from '../Statistics'
import PlanetInfo from '../PlanetInfo'

import './css/reset.css'
import './css/general.css'
import './css/app.css'

export default function App() {
    return (
        <Router>
            <div className='app__wrapper'>
                <aside>
                    <PlanetsList />
                    <Statistics />
                </aside>
                <aside>
                    <PlanetInfo />
                </aside>
            </div>
        </Router>
    )
}