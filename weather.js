const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = card.querySelector('.details');
const weatherImage = document.querySelector('.wImage');

//submit the form and get the weather forecast
cityForm.addEventListener('submit', e => {
    e.preventDefault();
   //update the ui
   const updateUi = (data) => {
        const { cityDetails, cityWeather } = data;

       details.innerHTML = `
       <div class="card-body  text-uppercase text-muted details">
            <h5 class="card-title">${cityDetails.EnglishName}</h5>
            <p class="card-text">${cityWeather.WeatherText}</p>
            <span class="card-text">${cityWeather.Temperature.Metric.Value}</span>
            <span class="card-text">&deg;C</span>
       </div>
       `;
          
       //show result when city is inputed
       if(card.classList.contains('d-none')){
           card.classList.remove('d-none')
       }

        let timeSrc = cityWeather.IsDayTime ?  'img/light.jpg' :   'img/night.jpeg';
     
       weatherImage.setAttribute('src', timeSrc);
   }

    //get the city value
    const city = cityForm.city.value.trim()

    //update the city with the apis
    const updateCity = async (city) => {
        const cityDetails = await getCity(city);
        const cityWeather = await getWeather(cityDetails.Key);

        return { cityDetails, cityWeather }
    }

    updateCity(city)
     .then(data => updateUi(data))
     .catch(err => console.log(err.message));
   
    //store city in localstorage
    localStorage.setItem('city', city)
    

    cityForm.reset();
})



//*********************//
//for local storage
const updateCity = async (city) => {
    const cityDetails = await getCity(city);
    const cityWeather = await getWeather(cityDetails.Key);

    return { cityDetails, cityWeather }
}

if(localStorage.getItem('city')){
   updateCity(localStorage.getItem('city'))
     .then(data => updateUi(data))
     .catch(err => console.log(err));
}

const updateUi = (data) => {
    const { cityDetails, cityWeather } = data;

   details.innerHTML = `
   <div class="card-body  text-uppercase text-muted details">
        <h5 class="card-title">${cityDetails.EnglishName}</h5>
        <p class="card-text">${cityWeather.WeatherText}</p>
        <span class="card-text">${cityWeather.Temperature.Metric.Value}</span>
        <span class="card-text">&deg;C</span>
   </div>
   `;
      
   //show result when city is inputed
   if(card.classList.contains('d-none')){
       card.classList.remove('d-none')
   }

    let timeSrc = cityWeather.IsDayTime ?  'img/light.jpg' :   'img/night.jpeg';
 
   weatherImage.setAttribute('src', timeSrc);
}
