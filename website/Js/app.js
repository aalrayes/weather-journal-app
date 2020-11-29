// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
const data =[];

// api url 
const api_url = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const unit = '&units=metric';

// Personal API Key for OpenWeatherMap API
const OpenWeatherMapKey = '&appid=f8f790b9897be880adc3460f064e32dd';

//UI elements
const dateDiv = document.getElementById('date');
const tempDiv = document.getElementById('temp');
const contentDiv = document.getElementById('content');

const zip = document.getElementById('zip');
const feelings = document.getElementById('feelings');
const generate = document.getElementById('generate');

// Event listener to add function to existing HTML DOM element
generate.addEventListener('click', callBack);

/* Function called by event listener */
function callBack() {
  const zip = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  getWeather(api_url, zip, OpenWeatherMapKey);
}

/* Function generate content*/
function generateContent(data){
  console.log(data);
  dateDiv.innerHTML= newDate;
}

/* Function to GET Web API Data*/
const getWeather = async (api_url, zip, key) => {
  const res = await fetch(api_url + zip + unit + key);
  console.log(api_url + zip + unit + key);
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
    alert('Please enter the correct zip code for any US city');
  }
}

/* Function to POST data */
const postData = async (url = 'http://localhost:8000/addZip', data = {}) => {
  console.log(data)
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });
  try {
    const newData = await response.json();
    // console.log(newData);
    return newData
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
}

/* Function to GET Project Data */
const getData = async ()=>{
  const res = await fetch('http://localhost:8000/zip');
  try {
    const data = await res.json();
    console.log(data)
    return generateContent(data);
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }

}

