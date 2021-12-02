// DOMElements
let input = document.querySelector('input') // Input
const btn = document.querySelector('button') // Button
const errorInfo = document.querySelector('.error-info') // Error
const cityName = document.querySelector('.city-name h2') // City name
const icon = document.querySelector('.statusIcon') // Weather icon
const weather = document.querySelector('.weather') // Weather type
const temperature = document.querySelector('.temperature') // Temperature
const humidity = document.querySelector('.humidity') // Humidity
const pressure = document.querySelector('.pressure') // Pressure
const imgBG = document.querySelector('.wrapper') // Background photo

const enterKeyCheck = e => {
    if (e.key === 'Enter') {
        city()
    }
}

function city() {
    let r = Math.floor(Math.random() * 15) // Background photo ID
    let citySearch = input.value
    cityName.textContent = citySearch

    // API for PIXABAY
    const API_KEY_PIXABAY = '24612721-828ae861e14e16293bf85b0c5';
    const URL_PIXABAY = 'https://pixabay.com/api/?key=' + API_KEY_PIXABAY + '&q=' + citySearch + '&image_type=photo';

    // API for OPENWEATHER
    const API_KEY_OPENWEATHER = '96562508b21bcf207e3f7d48f2f83116';
    const URL_OPENWEATHER = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearch + '&appid=' + API_KEY_OPENWEATHER + '&units=metric';

    // Background photo loads
    fetch(URL_PIXABAY)
        .then(res => res.json())
        .then(res => imgBG.style.backgroundImage = `url("${res.hits[r].webformatURL}")`)
        .catch(err => imgBG.style.backgroundImage = `url("https://cdn.pixabay.com/photo/2018/01/25/16/17/panorama-3106487_960_720.jpg")`)

    // Weather details loads
    fetch(URL_OPENWEATHER)
        .then(res => res.json())
        .then(data => {
            temperature.textContent = data.main.temp.toFixed(1)
            humidity.textContent = data.main.humidity
            pressure.textContent = data.main.pressure
            let status = Object.assign({}, ...data.weather)
            // Weather status selector
            if (status.id >= 200 && status.id < 300) {
                icon.setAttribute('src', "./png/thunderstorm.png")
            } else if (status.id >= 300 && status.id < 400) {
                icon.setAttribute('src', "./png/drizzle.png")
            } else if (status.id >= 500 && status.id < 600) {
                icon.setAttribute('src', "./png/rain.png")
            } else if (status.id >= 600 && status.id < 700) {
                icon.setAttribute('src', "./png/ice.png")
            } else if (status.id >= 700 && status.id < 800) {
                icon.setAttribute('src', "./png/fog.png")
            } else if (status.id === 800) {
                icon.setAttribute('src', "./png/sun.png")
            } else if (status.id >= 801 && status.id < 900) {
                icon.setAttribute('src', "./png/cloud.png")
            } else {
                icon.setAttribute('src', "./png/unknown.png")
            }
            input.value = ''
        })
        // Reset display info
        .catch(err => {
            cityName.textContent = 'Sorry, no data'
            temperature.textContent = '--'
            humidity.textContent = '--'
            pressure.textContent = '--'
            icon.setAttribute('src', "./png/unknown.png")
            input.value = ''
        })
}



btn.addEventListener('click', city)
input.addEventListener('keyup', enterKeyCheck)
