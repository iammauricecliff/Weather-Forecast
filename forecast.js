const apiKey = '5NbARNItJEGCUOIydz2g3BsikQyu1RyH';

//get city weather information
const getWeather = async(id) => {
    const Base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const Query = `${id}?apikey=${apiKey}`;
    const response = await fetch(Base + Query)
    const data = await response.json()
    
    return data[0]
}



//get the city information
const getCity = async(city) => {
   const Base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
   const Query = `?apikey=${apiKey}&q=${city}`;

   const response = await fetch(Base + Query);
   const data = await response.json();

   return data[0]
}

// getCity('Lagos').then(data => {
//    return getWeather(data.Key)
// }).then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err.messsage)
// })

