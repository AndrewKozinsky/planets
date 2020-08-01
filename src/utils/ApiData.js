
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
                .then(data => ({
                    status: 'Success',
                    data
                }))
        }
        catch (error) {
            // Если произошла ошибка, то послать ошибочный ответ
            return {
                status: 'Error'
            }
        }
    }
    
    // Получение всех планет с определённой страницы.
    // По умолчанию будут возвращены планеты первой страницы.
    async getPlanets(pageNum = 1) {
        const urlSuffix = 'planets/?page=' + pageNum
        
        let serverRes = await this.getData(urlSuffix)
        
        if(serverRes.status === 'Error') return serverRes
        
        const planets = serverRes.data.results
        
        // К каждой планенты добавляется свойство id равное последнему числу в URL планеты
        planets.forEach(planet => {
            planet.id = this.getPlanetIdInUrl(planet.url)
        })
        
        return {
            status: 'Success',
            data: planets
        }
    }
    
    // Получение планеты по ID
    async getPlanet(planetId) {
        const urlSuffix = 'planets/' + planetId
    
        let serverRes = await this.getData(urlSuffix)
    
        if(serverRes.status === 'Error') return serverRes
    
        return {
            status: 'Success',
            data: serverRes.data
        }
    }
    
    // Получение общего количества планет
    async getTotalPlanetsCount() {
    
        const urlSuffix = 'planets'
    
        let serverRes = await this.getData(urlSuffix)
        if(serverRes.status === 'Error') return serverRes
        
        return {
            status: 'Success',
            data: serverRes.data.count
        }
    }
    
    // Получение объекта со статистикой по персонажам, планетам и так далее
    async getStatistics() {
        const serverRes = await this.getData()
        
        if(serverRes.status === 'Error') {
            return serverRes
        }
    
        const namesArr = []
        const requestsArr = []
        
        const addresses = serverRes.data
    
        for(let key in addresses) {
            namesArr.push(key)
            requestsArr.push(
                this.getItemsCount(addresses[key])
            )
        }
    
        const countsArr = await Promise.all(requestsArr).then(values => values)
    
        const resultArr = []
    
        for(let i = 0; i < namesArr.length; i++) {
            resultArr.push({
                [namesArr[i]]: countsArr[i]
            })
        }
    
        return {
            status: 'Success',
            data: resultArr
        }
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