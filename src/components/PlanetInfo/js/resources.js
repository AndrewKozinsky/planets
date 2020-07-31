// Функция получает id планеты по переданному path
// /planets/36  -->  36
export function getPlanetIdInUrl(path) {
    const urlArr = path.split('/')
    
    if(urlArr[1] !== 'planets') return null
    if(typeof parseInt(urlArr[2]) !== 'number') return null
    
    return urlArr[2]
}

// Функция находит в Хранилище данные планеты по его ID
export function findPlanetInStore(planets, planetId) {
    if(!planets) return null
    
    let planet;
    
    planets.forEach(pageObj => {
        pageObj.planets.forEach(planetsObj => {
            if(planetsObj.id === planetId) planet = planetsObj
        })
    })
    
    return planet
}