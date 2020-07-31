// Добавление данных о планетах на переданной странице
export function setPlanets(state, action) {
    
    const stateCopy = {...state}
    
    let planetsCopy = stateCopy.planets ? [...stateCopy.planets] : []

    const newPlanetsPage = {
        page: action.page,
        planets: action.planets
    }
    
    planetsCopy.push(newPlanetsPage)
    
    stateCopy.planets = planetsCopy
    return stateCopy
}

// Изменение текущей страницы списка планет
export function changePlanetPage(state, action) {
    const stateCopy = {...state}
    
    stateCopy.currentPlanetsPage = action.page
    
    return stateCopy
}
