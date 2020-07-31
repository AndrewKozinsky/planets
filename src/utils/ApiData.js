
// Класс получающий данные с API
class ApiData {
    rootUrl = 'https://swapi.dev/api/'
    
    // Метод по умолчанию получает данные с корневого адреса API.
    // В urlSuffix можно задать конкертный адрес. Он будет прибавлен к корневому адресу.
    async getData(urlSuffix) {
        
        let url = this.rootUrl
        if(urlSuffix) url += urlSuffix
        
        const params = { method: 'GET' }
    
        try {
            return await fetch(url, params)
                .then(data => data.json())
                .then(data => data)
        }
        catch (error) {
            return error
        }
    }
    
    // Получение всех планет с определённой страницы.
    // По умолчанию будут возвращены планеты первой страницы.
    async getPlanets(pageNum = 1) {
        const urlSuffix = 'planets/?page=' + pageNum
        
        let serverRes = await this.getData(urlSuffix)
        const planets = serverRes.results
        
        // К каждой планенты добавляется свойство id равное последнему числу в URL планеты
        planets.forEach(planet => {
            planet.id = this.getPlanetIdInUrl(planet.url)
        })
        
        return planets
    }
    
    // Получение планеты по ID
    async getPlanet(planetId) {
        const urlSuffix = 'planets/' + planetId
        
        return await this.getData(urlSuffix)
    }
    
    // Получение общего количества планет
    async getTotalPlanetsCount() {
    
        const urlSuffix = 'planets'
    
        let serverRes = await this.getData(urlSuffix)
    
        return serverRes.count
    }
    
    // Получение объекта со статистикой по персонажам, планетам и так далее
    async getStatistics() {
        const addresses = await this.getData()
    
        const namesArr = []
        const requestsArr = []
    
        for(let key in addresses) {
            namesArr.push(key)
            requestsArr.push(
                this.getItemsCount(addresses[key])
            )
        }
    
        const countsArr = await Promise.all(requestsArr).then(values => values);
    
        const resultArr = []
    
        for(let i = 0; i < namesArr.length; i++) {
            resultArr.push({
                [namesArr[i]]: countsArr[i]
            })
        }
    
        return resultArr
    }
    
    
    // Получить количество элементов определённого типа (персонажи, планеты)
    async getItemsCount(url) {
        return await fetch(url)
            .then(data => data.json())
            .then(data => data.count)
    }
    
    // Метод получает id планеты из его URL
    // http://swapi.dev/api/planets/1/  -->  1
    getPlanetIdInUrl(path) {
        const urlArr = path.split('/')
        
        if(urlArr[4] !== 'planets') return null
        if(typeof parseInt(urlArr[5]) !== 'number') return null
    
        return urlArr[5]
    }
}

export default new ApiData()