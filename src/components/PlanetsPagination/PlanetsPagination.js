import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {changePlanetPage} from '../../store/actions'
import apiData from '../../utils/ApiData'
import './css/PlanetsPagination.css'


// Страничная нумерация списка планет
export default function PlanetsPagination() {
    const {currentPlanetsPage} = useSelector(store => store)
    const [pagesCount, setPagesCount] = useState(1)
    
    // При отрисовке компонента
    useEffect(() => {
        // Получить количество страниц списка страниц
        apiData.getTotalPlanetsCount().then(serverRes => {
            // Если сервер прислал ошибочный ответ
            if(serverRes.status === 'Error') {
                setPagesCount('Error')
            }
            // Сервер прислал успешный ответ
            else {
                // Получить количество страниц
                const pagesCount = Math.ceil(serverRes.data / 10)
                // Поставить количество страниц в местное состояние
                setPagesCount(pagesCount)
            }
        })
    }, [])
    
    // Если есть только одна страница, то ничего не отрисовывать
    if(pagesCount === 1) return null
    
    // Если в pagesCount стоит Error, то сервер прислал ошибочный ответ. Поэтому сообщить об этом пользователя.
    if(pagesCount === 'Error') return <p>Can't get data from a server...</p>
    
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
