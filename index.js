//Google maps API key AIzaSyC0G2-8xd7aOz0KEqQgcY-D6xJ3K5wjKuA
//Weather API key ad56f8149383696e72c819221a36f971
//mongodb+srv://testdbuser:JFK7kl4qFxicGilK@yutoa.hgy4o0a.mongodb.net/
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

app.get("/", async (request, response) => {
  let cityName = request.query.lat || "Toronto"; 
  let weatherList = await apiHandling.getWeather(cityName);
  response.render("index", { title: "weather", weather: weatherList });
  });

  app.get("/cityWeather", async (request, response) => {
     let cityName = request.query.cityName; 
     let weatherData = await apiHandling.getWeatherByCity(cityName);
     let categoryList = await apiHandling.getEvent();
     response.render("cityWeather", {title: "city weather", weather: weatherData, events:categoryList, eventsTitle: "Category List"});
     console.log('City Name from Query:', cityName);  
});

app.get("/category/:id", async (request, response) => {
  let eventList = await apiHandling.getEventbyCategory(request.params.id);
  response.render("event", {title: "event List", events: eventList });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
