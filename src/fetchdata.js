let cityCount = 0;
const { DateTime } = require("luxon");


const fetchData = async () => {
  try {
    const cityName = getCityName().toLowerCase();
    const unsplashData = await fetchUnsplashData(cityName);
    const photoUrl = unsplashData.results[0].urls.regular;
    const city = await fetchCityData(cityName);
    const weatherData = await fetchWeatherData(city.lat, city.lon);
    const temperatures = getTemperatures(weatherData);
    console.log(weatherData)
    const formattedDate = getFormattedDate(weatherData.list[0].dt);
    const capitalizedCityName = capitalizeCityName(cityName);
    createChart(cityName, photoUrl, temperatures, formattedDate, capitalizedCityName);

    cityCount++;
    if (cityCount > 2) {
      removeFirstChart();
      cityCount--;
    }
  } catch (error) {
    console.log(error);
  }
}

const getCityName = () => document.getElementById("cityName").value;

const fetchUnsplashData = async (cityName) => {
  const unsplashResponse = await fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${cityName}&client_id=6Zhb8bS8u-t064Jq4aCc7TcIaNYrpi3-pZtG1QywCPA`
  );
  return unsplashResponse.json();
}

const fetchCityData = async (cityName) => {
  const geoResponse = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=aa57f0056a232aa3a857afcdab000cbe`
  );
  if (!geoResponse.ok) {
    throw new Error("Could not fetch city data");
  }
  const geoData = await geoResponse.json();
  return geoData[0];
}

const fetchWeatherData = async (lat, lon) => {
  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=aa57f0056a232aa3a857afcdab000cbe`
  );
  if (!weatherResponse.ok) {
    throw new Error("Could not fetch weather data");
  }
  return weatherResponse.json();
}

const getTemperatures = (weatherData) => {
  const temperatures = [];
  for (let i = 0; i < 5; i++) {
    const temp = (weatherData.list[i].main.temp - 273.15).toFixed(0);
    temperatures.push(temp);
  }
  return temperatures;
}

const getFormattedDate = (timestamp) => {

  const normalDate = new DateTime(timestamp);
  const year = normalDate.year
  const month = normalDate.month
  const day = normalDate.day
  return `${day}/${month}/${year}`;
}

const capitalizeCityName = (cityName) => {
  const firstLetter = cityName.charAt(0)
  const firstLetterCap = firstLetter.toUpperCase()
  const remainingLetters = cityName.slice(1)
  return firstLetterCap + remainingLetters;
}

const createChart = (cityName, photoUrl, temperatures, formattedDate, capitalizedCityName) => {
  const chartsContainer = document.querySelector(".container");
  const chartContainer = document.createElement("div");
  chartContainer.classList.add("chart-container");
  chartsContainer.appendChild(chartContainer);

  const canvas = document.createElement("canvas");
  canvas.id = `chart-${cityName}`;
  canvas.classList.add("chart-canvas");
  canvas.style.backgroundImage = `url(${photoUrl})`;
  canvas.style.opacity = 0.9;
  chartContainer.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  Chart.defaults.font.family = "Tahoma";
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
      datasets: [
        {
          label: `${formattedDate}, ${capitalizedCityName} Temperature`,
          data: temperatures,
          backgroundColor: [
            "rgba(255, 99, 132, 1.7)",
            "rgba(54, 162, 235, 1.7)",
            "rgba(255, 206, 86, 1.7)",
            "rgba(75, 192, 192, 1.7)",
            "rgba(153, 102, 255, 1.7)",
          ],
          borderWidth: 1,
          borderColor: "black",
          hoverBackgroundColor: [
            "rgba(255, 99, 132, 0.4)",
            "rgba(54, 162, 235, 0.4)",
            "rgba(255, 206, 86, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(153, 102, 255, 0.4)",
          ],
          hoverBorderWidth: 4,
        },
      ],
    },
    options: {
      plugins:{
        legend:{
          display: false,
        },
        title:{
          display: true,
          color: 'white',
          text: `${formattedDate}, ${capitalizedCityName} Temperature`
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'black'
          },
          ticks: {
            color: 'white', 
          },
        },
        x: {
          grid: {
            color: 'black'
          },
          ticks: {
            color: 'white', 
          },
        },
      },
      tooltips: {
        enabled : false,
      }
    },
  });
}

const removeFirstChart = () => {
  const firstChart = document.querySelector(".chart-container");
  firstChart.remove();
}


export { fetchData };