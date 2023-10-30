import { Header, Nav, Main, Footer } from "./components";
import * as store from "./store";
import Navigo from "navigo";
import { capitalize } from "lodash";
import axios from "axios";
import { error } from "console";
// import * as utils from "./utils";

const router = new Navigo("/");

function render(state = store.Intro) {
  document.querySelector("#root").innerHTML = `
  ${Header(state)}
  ${Nav(store.Links)}
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
        .post(`${process.env.DISCUSSION_POST_API}/discussion`, requestData)
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
  before: async (done, params) => {
    // We need to know what view we are on to know what data to fetch
    const view =
      params && params.data && params.data.view
        ? capitalize(params.data.view)
        : "Home";
    // create variables for user location
    let location;
    // Add a switch case statement to handle multiple routes
    switch (view) {
      // New Case for the Home View
      case "Home":
        try {
          const response = await axios.get(
            `https://extreme-ip-lookup.com/json/?key=${process.env.EX_IP_API_KEY}`
          );
          console.log(response);
          // Create an object to be stored in the Home state from the response
          store.Home.location = {
            city: response.data.city,
            state: response.data.region,
            country: response.data.country,
            lat: response.data.lat,
            long: response.data.lon
          };
          console.log(store.Home.location);
        } catch (err) {
          console.log(err);
          done();
        }
        location = store.Home.location;
        axios
          // Get request to retrieve the current weather data using the API key and providing a city name
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&limit=1&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}`
          )
          .then(response => {
            // Convert Kelvin to Fahrenheit since OpenWeatherMap does provide otherwise
            const kelvinToFahrenheit = kelvinTemp =>
              Math.round((kelvinTemp - 273.15) * (9 / 5) + 32);

            // Create an object to be stored in the Home state from the response
            store.Home.weather = {
              city: response.data.name,
              state: response.data.region_name,
              country: response.data.country_code,
              temp: kelvinToFahrenheit(response.data.main.temp),
              feelsLike: kelvinToFahrenheit(response.data.main.feels_like),
              description: response.data.weather[0].main
            };

            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });

        break;
      // Add a case for each view that needs data from an API
      case "Carebook":
        // New Axios get request utilizing already made environment variable
        if (params.params.plantSearch) {
          axios
            .get(
              `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}&q=${params.params.plantSearch}` //need to search for plants through an input
            )
            .then(response => {
              console.log("response", response);
              // create object to be stored
              // store.Carebook.CareBooks = {
              //   common_name: response.data.common_name,
              //   scientific_name: response.data.scientific_name,
              //   cycle: response.data.cycle,
              //   waterFrequency: response.data.watering,
              //   sunLight: response.data.sunlight,
              //   image: response.data.default_image
              store.Carebook.CareBooks = response.data;
              console.log(store);
              done();
            });
        } else {
          done();
        }
        break;
      case "Schedule":
        try {
          const response = await axios.get(
            `https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`
          );

          // create data array
          const data = await response.json();
          // create table
          let table = `<table>`;
          // add header row to table
          table += `<tr><th>Plant</th><th>Water</th><th>Growth Cycle</th><th>Date Planted</th></tr>`;
          /* create variable to call table ID "Schedule" from view/html */
          const scheduleTable = document.getElementById("table");
          // for each method to iterate over & add each dynamic plant schedule
          data.forEach(plantData => {
            // dynamically add data. need to view API data to get correct names of water and fertilization frequency
            table += `<tr><td>${plantData.data.common_name}</td><td>${plantData.data.watering}</td><td>${plantData.data.cycle}</td><td>${plantData.datePlanted}</td></tr>`;

            table += `</table>`;
          });

          /* Append variable and function to views/html */
          scheduleTable.push(table);
          console.log("New Schedule Created!");
          return table;
        } catch (error) {
          document.getElementById("not-found");
        }
        done();
        break;
      case "Discussion":
        await axios
          .get(`${process.env.DISCUSSION_POST_API}/discussion`)
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
      case "Mygarden":
        axios
          .get(`${process.env.DISCUSSION_POST_API}/mygarden`)
          .then(response => {
            try {
              const countDown = ` ${state.GardenTracker.data.map(() => {
                let today = new Date().getTime;
                let maturityDate = new Date(`${plantData.maturityDate}`)
                  .getTime;
                let submitEntryButton = document.getElementById("countDown");
                let maturityDateMinusToday = maturityDate - today;
                // Math.floor rounds down to the nearest integer.
                // converting from milliseconds to days
                let daysLeft = Math.floor(
                  maturityDateMinusToday / (1000 * 60 * 60 * 24)
                );
                document.getElementById("countDown").innerHTML = daysLeft;
                if (maturityDateMinusToday == 0) {
                  submitEntryButton.disabled = false;
                } else {
                  submitEntryButton.disabled = true;
                }
              })}`;
            } catch (error) {
              document.getElementById("not-found");
              // store to state
              console.log("response", response);
              store.Mygarden.GardenTracker = response.data;
              done();
            }
          })
          .catch(error => {
            console.log("Whoopsie", error);
            done();
          });
        break;
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
console.log(store);
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
