// ! 1a0b4101244449229f5172457241712
// ! http://api.weatherapi.com/v1/forecast.json?key=1a0b4101244449229f5172457241712&q=egypt&days=3
// ! const d = new Date(); · const d = new Date(); · const d = new Date("October 13, 2014 11:13:00"); · const d = new Date(2018, 11, 24, 10 ...

const finalocation = document.getElementById('finalocation');
finalocation.addEventListener('input', function (e) {
  getData(e.target.value);
  console.log(e.target.value);
});

async function getData(cityName) {
  try {
    document.querySelector(
      ".all-card"
    ).innerHTML = `
  <div class="cloud front">
    <span class="left-front"></span>
    <span class="right-front"></span>
  </div>
  <span class="sun sunshine"></span>
  <span class="sun"></span>
  <div class="cloud back">
    <span class="left-back"></span>
    <span class="right-back"></span>
</div>`;
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=1a0b4101244449229f5172457241712&q=${cityName}&days=3`);
    const data = await response.json();
    console.log(data);
    displayData(data);
  } catch (error) {
    console.error(error);
  }
}

getData("cairo");

function displayData(data) {
  let location = data.location;
  let dataCurrentDay = data.current;

  let array1 = data.forecast.forecastday[0];
  let array2 = data.forecast.forecastday[1];
  let array3 = data.forecast.forecastday[2];

  let date1 = new Date(array1.date);
  let date2 = new Date(array2.date);
  let date3 = new Date(array3.date);

  let weekday1 = date1.toLocaleDateString("en-us", { weekday: "long" });
  let weekday2 = date2.toLocaleDateString("en-us", { weekday: "long" });
  let weekday3 = date3.toLocaleDateString("en-us", { weekday: "long" });

  let month = date1.toLocaleDateString("en-us", { month: "long" });

  let time = data.location.localtime;
  let date = new Date(time);
  let day = date.getDate();

  let cartona = `
  <div class="bg-forecast1 rounded-4 w-100 current-forecast d-flex flex-column justify-content-center align-items-center">
                    <div class="w-100 current-forecast-header d-flex justify-content-between align-items-center">
                        <div class="day">${weekday1}</div>
                        <div class="date">${day}${month}</div>
                    </div>
                    <div class="current-forecast-content d-flex flex-column justify-content-center align-items-start">
                        <div class="location me-4">${location.name}</div>
                        <div class="current-degree">${dataCurrentDay.temp_c}<sup>o</sup>C</div>
                        <div class="current-forecast-icon"><img src="https:${dataCurrentDay.condition.icon}" alt="icon"></div>
                        <div class="custom my-2">${dataCurrentDay.condition.text}</div>
                        <div class="span-current-forecast">
                            <span class="me-2"><img class="me-2" src="image/icon-umberella.png"
                                    alt="icon-umberella">${dataCurrentDay.cloud}%</span>
                            <span class="me-2"><img class="me-2" src="image/icon-wind.png" alt="icon-wind">${dataCurrentDay.wind_kph}Kph</span>
                            <span class="me-2"><img class="me-2" src="image/icon-compass.png"
                                    alt="icon-compass">${dataCurrentDay.humidity}%</span>
                        </div>
                    </div>
                </div>
                <div class="bg-forecast2 rounded-4 w-100 forecast flex-column d-flex justify-content-center align-items-center">
                    <div class="w-100 forecast-header d-flex justify-content-center align-items-center">
                        <div class="day text-center">${weekday2}</div>
                    </div>
                    <div class="forecast-contect d-flex flex-column justify-content-center align-items-center">
                        <div class="forecast-icon">
                            <img src="https:${array2.day.condition.icon}" alt="icon">
                        </div>
                        <div class="degree">${array2.day.maxtemp_c}<sup>o</sup>C</div>
                        <div class="night-degree">${array2.day.mintemp_c}<sup>o</sup></div>
                        <div class="custom">${array2.day.condition.text}</div>
                    </div>
                </div>
                <div class="bg-forecast1 rounded-4 w-100 forecast flex-column d-flex justify-content-center align-items-center">
                    <div class="w-100 forecast-header d-flex justify-content-center align-items-center">
                        <div class="day text-center">${weekday3}</div>
                    </div>
                    <div class="forecast-contect d-flex flex-column justify-content-center align-items-center">
                        <div class="forecast-icon">
                            <img src="https:${array3.day.condition.icon}" alt="icon">
                        </div>
                        <div class="degree">${array3.day.maxtemp_c}<sup>o</sup>C</div>
                        <div class="night-degree">${array3.day.mintemp_c}<sup>o</sup></div>
                        <div class="custom">${array3.day.condition.text}</div>
                    </div>
                </div>
`;
  document.querySelector(".all-card").innerHTML = cartona;
}

function myLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let currentLocation = `${latitude},${longitude}`;
  getData(currentLocation);
}
navigator.geolocation.getCurrentPosition(myLocation);