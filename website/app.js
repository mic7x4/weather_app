// Personal API Key for OpenWeatherMap API
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?';
const API_KEY = '&appid=b1866fbfe2b86a09784ab17c618d8d3f&units=imperial';
const MY_SERVER_URL = 'http://localhost:8000';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);
let temp = document.getElementById('temp');
let newDate = document.getElementById('date');
let content = document.getElementById('content');

/* Function called by event listener */
function performAction(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(zip, feelings);
}

/* Function to GET Web API Data*/
/* Function to POST data */
/* Function to GET Project Data */
const getWeather = async (zip, feelings) => {

  const res = await fetch(`${BASE_URL}q=${zip}${API_KEY}`) 
      .then(response => response.json())
      .then(data => {
        const kelvin = data.main.temp;
        const d = new Date();
        const newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();
        return postData(`${MY_SERVER_URL}/addAllWeatherData`, { 
          date: newDate,
          temperature: kelvin,
          feelings: feelings,
        });
      })
      .then(() => getData()) 
      .then(allData => {
          const newData =  allData;
          updateUI(newData);
      });
}

function updateUI(newData){
    content.innerHTML =  newData.feelings;
    newDate.innerHTML =  newData.date;
    temp.innerHTML = newData.temperature;

}

const getData =  async ()=>{
  const response =  await fetch(`${MY_SERVER_URL}/all`);
  try {
      const data = await response.json();
      return data
  } catch (error) {
    console.error(error);
  }
}

// POST data
const postData = async (url = '', data = {})=>{
  return await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}