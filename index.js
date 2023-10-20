import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
// import * as utils from "./utils";

const router = new Navigo("/");

function render(state = store.Intro) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Main(state)}
  ${Footer(store.Links)}
  `;
  afterRender(state);
  router.updatePageLinks();
}

function afterRender(state) {
  // add menu toggle to bars icon in nav bar
  document.querySelector(".fa-bars").addEventListener("click", () => {
    document.querySelector("nav > ul").classList.toggle("hidden--mobile");
  });

  if (state.view === "Discussion") {
    // event handler for new post submit button
    document.querySelector("form").addEventListener("submit", event => {
      event.preventDefault();

      // get form element
      const allPosts = event.target.elements;
      console.log("Retrieved all Posts", allPosts);

      const requestData = {
        creator: allPosts.creator.value,
        title: allPosts.title.value,
        post: allPosts.post.value
      };
      console.log("request Body", requestData);

      axios
        .post(`${process.env.DISCUSSION_POST_API}/discussionposts`, requestData)
        .then(response => {
          // push new post to forum allPosts
          store.Discussion.allPosts.push(response.data);
          router.navigate("/Discussion");
        })
        .catch(error => {
          console.log("Whoopsie", error);
        });
    });
  }
}

router.hooks({
  before: (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&q=st%20louis`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };

            // An alternate method would be to store the values independently
            /*
      store.Home.weather.city = response.data.name;
      store.Home.weather.temp = kelvinToFahrenheit(response.data.main.temp);
      store.Home.weather.feelsLike = kelvinToFahrenheit(response.data.main.feels_like);
      store.Home.weather.description = response.data.weather[0].main;
      */
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        axios
          .get(
            `http://api.ipstack.com/check
          ? IPSTACK_API_KEY
          & fields = city
          & fields = region
          & fields = time_zone
          & output = json`
          )
          .then(response => {
            // Create an object to be stored in the Home state from the response
            store.Home.location = {
              city: response.data.city,
              state: response.data.region,
              time_zone: response.data.time_zone
            };
            const userCity = store.Home.location.city;
            const userState = store.Home.location.region;
            const userTimeZone = store.Home.time_zone.current_time;
            console.log(`${(userCity, userState)}`);
            console.log(`${userTimeZone}`);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        break;
      // Add a case for each view that needs data from an API
      case "CareBook":
        // New Axios get request utilizing already made environment variable
        axios
          .get(
            `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}&q=`
          )
          .then(response => {
            // We need to store the response to the state, in the next step but in the meantime let's see what it looks like so that we know what to store from the response.
            console.log("response", response);
            store.CareBook.CareBooks = response.data;
            done();
          })
          .catch(error => {
            console.log("Whoopsie", error);
            done();
          });
        break;
      case "DiscussionPost":
        axios
          .get(`${process.env.DISCUSSION_POST_API}/discussionposts`)
          .then(response => {
            // store response to state
            console.log("response", response);
            store.Discussion.DiscussionPosts = response.data;
            done();
          })
          .catch(error => {
            console.log("Whoopsie", error);
            done();
          });
        break;
      default:
        done();
    }
  },
  already: params => {
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";

    render(store[view]);
  }
});

router
  .on({
    "/": () => render(),
    ":view": params => {
      let view = capitalize(params.data.view);
      if (view in store) {
        render(store[view]);
      } else {
        render(store.Viewnotfound);
        console.log(`View ${view} not defined`);
      }
    }
  })
  .resolve();
