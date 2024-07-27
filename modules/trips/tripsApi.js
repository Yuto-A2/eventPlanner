const wheather = "https://api.openweathermap.org";
const event = "https://www.eventbriteapi.com/v3";

// Get weather for the specific cities.
async function getWeather(cityName) {
    let reqUrl = `${wheather}/data/2.5/weather?q=${cityName}&limit=5&appid=${process.env.Weather_API_KEY}`;
    let response = await fetch(
        reqUrl,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "wheather-api-key": process.env.Weather_API_KEY
            }
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    }

    // To search the weather of the city.
   async function getWeatherByCity(cityName){
    let reqUrl = `${wheather}/data/2.5/weather?q=${cityName}&appid=${process.env.Weather_API_KEY}`
    let response = await fetch (
        reqUrl,
        {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "wheather-api-key": process.env.Weather_API_KEY
            }   
        }
    )
  return await response.json();
   }

//    Find category of an event.
   async function getEvent(){
    let reqUrl = `${event}/categories//?token=${process.env.Event_API_Key}`
    let response = await fetch (
    reqUrl,
    {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${process.env.Event_API_Key}`
        }
    }
)
    let data = await response.json();
    console.log(data); 
    return data.categories; 
   }

//    Find a specific category.
   async function getEventbyCategory(id){
    let reqUrl = `${event}/categories/${id}/?token=${process.env.Event_API_Key}`
    let response = await fetch (
    reqUrl,
    {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${process.env.Event_API_Key}`
        }
    }
)
    return await response.json(); 
   }

    module.exports = {
        getWeather,
        getWeatherByCity,
        getEvent,
        getEventbyCategory
    }