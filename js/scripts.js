// what is the path to the JSON file?
const apiURL = "//api.openweathermap.org/data/2.5/forecast?id=2128295&appid=60e806425103fe7664141785c6679a6d&units=imperial"

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

//Go fetch it and then wait for a response.
fetch(apiURL)
  .then((response) => response.json())
  .then((weatherInfo) => {

    let pageHeader = document.getElementById('place-name')
    pageHeader.textContent = weatherInfo.city.name

    let myPage = document.getElementById('card-container')

    const d = new Date()
    const todayNum = d.getDay()
    let forecastDay = todayNum

    let wList = weatherInfo.list

    let i
    for(i=0; i < wList.length; i++) {

      let time = wList[i].dt_txt
      if (time.includes('21:00:00')) {
        forecastDay += 1
        if (forecastDay === 7) {
          forecastDay = 0
        }
        let currentCard = document.createElement('div')
        currentCard.classList.add('weather-card')

        let currentHeader = document.createElement('div')
        currentHeader.classList.add('weather-header')

        let currentDay = document.createElement('h3')
        currentDay.textContent = weekday[forecastDay]

        let currentTemp = document.createElement('h2')
        currentTemp.textContent = weatherInfo.list[i].main.temp + "\xB0"

        let currentIcon = document.createElement('img') 
        let iconPath = "//openweathermap.org/img/w/" + weatherInfo.list[i].weather[0].icon + ".png"
        currentIcon.src = iconPath

        currentHeader.appendChild(currentDay)
        currentCard.appendChild(currentHeader)
        currentCard.appendChild(currentTemp)
        currentCard.appendChild(currentIcon)

        myPage.appendChild(currentCard)
      }
    }

    
    
}); //end of "then" fat arrow function