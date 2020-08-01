// Функция ищет в массиве всех планет данные о планетах, которые нужно показать на переданной странице
export function findPlanetOnPageInStore(planets, pageNum) {
    if(!planets) return null
    
    const foundedPlanets = planets.find(planetsObj => {
        return planetsObj.page === pageNum
    })
    
    if (!foundedPlanets) return null
    
    return foundedPlanets.planets
}