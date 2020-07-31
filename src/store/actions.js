// Добавление данных о планетах на переданной странице
export function setPlanets(planets, page) {
    return {
        type: 'SET_PLANETS',
        planets,
        page
    }
}

// Изменение текущей страницы списка планет
export function changePlanetPage(page) {
    return {
        type: 'CHANGE_PLANET_PAGE',
        page
    }
}
