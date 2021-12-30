let d = new Date();
let newDate = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear();

const api_url = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const unit = '&units=metric';

const OpenWeatherMapKey = '';

document.getElementById('generate').addEventListener('click', init);

function init(e) {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(api_url, zip, OpenWeatherMapKey)
    .then(function (data) {
      postData('/all', {
        temperature: data.main.temp,
        date: newDate,
        feelings: feelings
      });
      generateContent();
    })
}

const getWeather = async (url, zip, key) => {

  const res = await fetch(url + zip + unit + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

const generateContent = async () => {
  const request = await fetch('/load');
  try {
    const projectData = await request.json();
    document.getElementById('date').innerHTML = projectData.date;
    document.getElementById('temp').innerHTML = projectData.temperature + ' c';
    document.getElementById('content').innerHTML = projectData.feelings;
  } catch (error) {
    console.log("error", error);
  }
}
