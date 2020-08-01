import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'
import {setPlanets} from '../../store/actions'

import PlanetsPagination from '../PlanetsPagination'
import apiData from '../../utils/ApiData'
import {getPlanetIdInUrl} from '../PlanetInfo/js/resources'
import {findPlanetOnPageInStore} from './js/resources'
import './css/PlanetsList.css'


// Компонент списка планет на определёной странице
export default function PlanetsList() {
    
    const dispatch = useDispatch()
    const {currentPlanetsPage, planets} = useSelector(state => state)
    
    const [planetsData, setPlanetsData] = useState(null)
    
    // При изменении страницы...
    useEffect(() => {
        // Поискать в Хранилище планеты текущей страницы
        const planetsInStore = findPlanetOnPageInStore(planets, currentPlanetsPage)

        // Если планеты текущей страницы есть в Хранилище,
        // то поставить их в местное состояние чтобы отрисовать на странице.
        if(planetsInStore) {
            setPlanetsData(planetsInStore)
            return
        }
        
        // В противном случае скачать планеты текущей страницы из API
        apiData.getPlanets(currentPlanetsPage)
            .then(serverRes => {
                // Если сервер прислал ошибочный ответ
                if(serverRes.status === 'Error') {
                    setPlanetsData('Error')
                }
                // Сервер прислал успешный ответ
                else {
                    dispatch(setPlanets(serverRes.data, currentPlanetsPage))
                    setPlanetsData(serverRes.data)
                }
            })
    }, [currentPlanetsPage])
    
    
    if (!planetsData) return null
    
    const middleEl = (planetsData === 'Error')
        ? <p>Can't get data from a server...</p>
        : <>
            <List planets={planetsData} />
            <PlanetsPagination />
          </>

    return (
        <div className='planets' >
            <h3 className='planets__header'>Planets</h3>
            {middleEl}
        </div>
    )
}

// Компонент отрисовывающий список планет
function List({planets}) {
    let location = useLocation()
    const pagePlanetId = getPlanetIdInUrl(location.pathname)
    
    // Перебрать массив планет чтобы сформировать разметку.
    return planets.map(planet => {
        const planetPageUrl = '/planets/' + planet.id
        
        let cls = 'planets__planet'
        // Если эта ссылка показывает выбранную планету, то задать ему подсвечивающий класс
        if(pagePlanetId === planet.id) cls += ' planets__planet--selected'
        
        // Если эта ссылка показывает выбранную планету, то не делать из неё ссылку.
        if(pagePlanetId === planet.id) {
            return (
                <div className={cls} key={planet.name}>
                    <p className='planets__planet-name'>{planet.name}</p>
                </div>
            )
        }
        // В противном случае сделать ссылку
        else {
            return (
                <Link className={cls} to={planetPageUrl} key={planet.name}>
                    <p className='planets__planet-name'>{planet.name}</p>
                </Link>
            )
        }
    })
}