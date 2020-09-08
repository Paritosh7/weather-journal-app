/* Global Variables */
const BASE_URL = `http://api.openweathermap.org/data/2.5/weather?zip=`
const API_KEY = "0db42f2d0035c9bf1cd54df26b0b1251";
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');
const genBtn = document.getElementById('generate');
const entryHolder = document.getElementById('entryHolder');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// posting received weather data to the server
const postData = async ( url = '', data)=>{
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
      console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    }
}

/** Updating the UI once the data has been retrieved 
 * and posted to the server **/
const updateUI = async () => {

    const res = await fetch('/getData');
    try{
      const allData = await res.json();
      date.innerHTML = `Date: ${allData.date}`;
      temp.innerHTML = `Temperature is ${allData.temperature} 'C`;
      content.innerHTML = allData.feelings;
      entryHolder.style.visibility = 'visible';
      toggleVisiblity('visible');
    }catch(error){
      console.log("error", error);
    }
  }

/** updating the UI incase of an error */
  function updateUIForError(err){
    console.log(err);
    toggleVisiblity('hidden');
    date.innerHTML = `Please enter a valid US zipcode`;
    entryHolder.style.visibility = 'visible';
  }

/** fetching the weather data from OpenWeather API */
const fetchWeatherData = ()=> {
    const zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;

    if(feelings === '' || null)
      feelings = "Don't leave the feelings behind";

    /** using fetch API to make a get request */
    fetch(`${BASE_URL}${zipCode}&units=metric&appid=${API_KEY}`)
    .then(response=>{
        response.json()
                .then(data => {
                    console.log('inside json data')
                    postData('/addData',{temperature:data.main.temp,
                    date:newDate,feelings:feelings})
                    updateUI();
                })
                /** calling updateUIForError in case of an error */
                .catch(err => updateUIForError(err));
    })
    .catch(err => console.log(err));
}

/** Adding an event listener to the generate
 *  button and responding when it's clicked.
 */
genBtn.addEventListener('click',fetchWeatherData);

/** toggling the visibility of entries, data
 * available | data not available.
 */
function toggleVisiblity(visibilityValue){
  temp.style.visibility = visibilityValue;
  content.style.visibility = visibilityValue;
}






  
