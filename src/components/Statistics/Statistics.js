import React, {useEffect, useState} from 'react';
import apiData from '../../utils/ApiData'
import './css/Statistics.css'

// Компонент статистики
export default function Statistics() {
    
    const [stats, setStats] = useState(null)
    
    useEffect(() => {
        // Получить объект статистики и поставить в местное Состояние
        apiData.getStatistics()
            .then(stats => {
                setStats(stats)
            })
    }, [])
    
    if(!stats) return null
    
    return (
        <div className='stats'>
            <p className='stats__name'>Statistics</p>
            <Stats statsArr={stats} />
        </div>
    )
}

// Компонент ститистики получающий готовые данные для отрисовки
function Stats({statsArr}) {
    
    return statsArr.map(statObj => {
        let val = Object.values(statObj)[0]
        
        let prop = Object.keys(statObj)[0]
        if(prop === 'people') prop = 'persons'
        
        prop = prop[0].toUpperCase() + prop.slice(1)
        
        return (
            <p className='stats__row' key={prop}>
                <span className='stats__val'>{val}</span>
                <span className='stats__prop'>{prop}</span>
            </p>
        )
    })
}