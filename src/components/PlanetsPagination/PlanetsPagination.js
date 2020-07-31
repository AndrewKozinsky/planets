import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changePlanetPage} from '../../store/actions'
import apiData from '../../utils/ApiData'
import './css/PlanetsPagination.css'

// Страничная нумерация списка планет
export default function PlanetsPagination() {
    const {currentPlanetsPage} = useSelector(store => store)
    const [pagesCount, setPagesCount] = useState(1)
    
    useEffect(() => {
        // Получить количество страниц списка страниц
        apiData.getTotalPlanetsCount().then(planetsCount => {
            const pagesCount = Math.ceil(planetsCount / 10)
            // Поставить количество страниц в местное состояние
            setPagesCount(pagesCount)
        })
    }, [])
    
    // Если есть только одна страница, то ничего не отрисовывать
    if(pagesCount === 1) return null
    
    // Сформировать массив кнопок переключающих страницы
    const pages = []
    
    for(let i = 0; i < pagesCount; i++) {
        pages.push(
            <Button key={i} isCurrent={ i + 1 === currentPlanetsPage} pageNum={i + 1}/>
        )
    }
    
    return (
        <div className='pagination'>
            {pages}
        </div>
    )
}

// Компонент кнопки нумерации страниц
function Button({pageNum, isCurrent}) {
    const dispatch = useDispatch()
    
    let cls = 'pagination__button'
    if(isCurrent) cls += ' pagination__button--current'
    
    const onBtnClick = function () {
        dispatch(changePlanetPage(pageNum))
    }
    
    return <button
        className={cls}
        onClick={onBtnClick}
    >
        {pageNum}
    </button>
}
