import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'

import { getPlanetIdInUrl, findPlanetInStore } from './js/resources'
import apiData from '../../utils/ApiData'
import './css/PlanetInfo.css'


// Компонент с данными о планете
export default function PlanetInfo() {
    let location = useLocation()
    
    // Все планеты сохранённые с Хранилище
    const {planets} = useSelector(store => store)
    
    // Местное состояние где будут данные о планете о которой нужно показать данные
    let [planetData, setPlanetData] = useState(null)
    
    // При изменении адреса страницы программа ищет массив планет сначала в Хранилище.
    // Если не находит, то скачивает с API и сохраняет в Хранилище.
    useEffect(() => {
        // Получу из URL id планеты
        const planetId = getPlanetIdInUrl(location.pathname)
        
        // Ничего не делать если в адресе не написан id планеты
        if(!planetId) return
        
        // Если в Хранилище есть массив планет...
        if(planets) {
            // Найти данные планеты по его ID и поставить в местное состояние
            const planetInStore = findPlanetInStore(planets, planetId)
            
            if(planetInStore) {
                const planetEl = <Planet planetData={planetInStore} />
                setPlanetData(planetEl)
            }
        }
        // Если в Хранилище данных о планете нет, то скачать из API
        else {
            apiData.getPlanet(planetId).then(planet => {
                const planetEl = <Planet planetData={planet} />
                setPlanetData(planetEl)
            })
    
            setPlanetData(<p>Planet info loading...</p>)
        }
    }, [location])
    
    if(!planetData) return <p>Select a planet to see details.</p>
    
    return planetData
}


// Компонент создающий данные о планете
function Planet({planetData}) {
    /*
        planet:
        climate: "frozen"
        diameter: "7200"
        gravity: "1.1 standard"
        name: "Hoth"
        orbital_period: "549"
        population: "unknown"
        rotation_period: "23"
        surface_water: "100"
        terrain: "tundra, ice caves, mountain ranges"
    */
    
    return (
        <section className='planet-info__section'>
            <h2 className='planet-info__header'>{planetData.name}</h2>

            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Climate:</span>
                <span className='planet-info__val'>{planetData.climate}</span>
            </p>
            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Diameter:</span>
                <span className='planet-info__val'>{planetData.diameter}</span>
            </p>
            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Gravity:</span>
                <span className='planet-info__val'>{planetData.gravity}</span>
            </p>
            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Orbital Period:</span>
                <span className='planet-info__val'>{planetData.orbital_period}</span>
            </p>
            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Rotation Period:</span>
                <span className='planet-info__val'>{planetData.rotation_period}</span>
            </p>
            <p className="planet-info__row-str">
                <span className='planet-info__prop'>Terrain:</span>
                <span className='planet-info__val'>{planetData.terrain}</span>
            </p>
        </section>
    )
}