const express = require("express");
const path = require("path"); 
const dotenv = require("dotenv");
const apiHandling = require("./modules/trips/tripsApi");
dotenv.config();

const app = express();
const port = process.env.PORT || "5505";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

// Homepage searching weather of a city.
app.get("/", async (request, response) => {
  let cityName = request.query.lat || "Toronto"; 
  let weatherList = await apiHandling.getWeather(cityName);
  response.render("index", { title: "weather", weather: weatherList });
  });

  // the weather of the specific city.
  app.get("/cityWeather", async (request, response) => {
     let cityName = request.query.cityName; 
     let weatherData = await apiHandling.getWeatherByCity(cityName);
     let categoryList = await apiHandling.getEvent();
     response.render("cityWeather", {title: "City Weather", weather: weatherData, events:categoryList, eventsTitle: "Category List"});
     console.log('City Name from Query:', cityName);  
});

// Find an event.
app.get("/category/:id", async (request, response) => {
  let eventList = await apiHandling.getEventbyCategory(request.params.id);
  response.render("event", {title: "event List", events: eventList });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
